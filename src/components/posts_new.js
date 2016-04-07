import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {
  // React-Router context. Don't abuse it, as the API is in flux and may change
  static contextTypes = {
    // React will traverse up to parent components looking for a property
    // called this.props.router. It will find it in routes.js (in our case).
    router: PropTypes.object
  };

  onSubmit(props) {
    this.props.createPost(props).then(() => {
        // blog post has been created. navigate to index.
        // We navigate by calling this.context.router.push with the new
        // path to navigate to
        this.context.router.push('/');
      });
  }

  render() {
    const { fields: { title, categories, content }, handleSubmit } = this.props;
    // const { handleSubmit } = this.props;
    // The above is equivalent to:
    // const handleSubmit = this.props.handleSubmit;
    // const title = this.props.fields.title

    return (
      /* <form onSubmit={handleSubmit(this.props.createPost)}> */
      /* The above code was valid before having onSubmit as a separate function */
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create a new post</h3>
        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Title</label>
          { /* The ...title: expands/deconstructs title so every property in title becomes part of the input */ }
          <input type="text" className="form-control" {...title} />
          <div className="text-help">
            {title.touched ? title.error : ''}
          </div>
        </div>

        <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
          <label>Categories</label>
          <input type="text" className="form-control" {...categories }/>
          <div className="text-help">
            {categories.touched ? categories.error : ''}
          </div>
        </div>

        <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
          <label>Content</label>
          <textarea className="form-control" {...content} />
          <div className="text-help">
            {content.touched ? content.error : ''}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Enter a username';
  }

  if (!values.categories) {
    errors.categories = 'Enter categories';
  }

  if (!values.content) {
    errors.content = 'Enter some content';
  }

  return errors;
}

// In JS, a 2nd parenthesis means that the 1st funciton returns another function
// And that 2nd function is called immediately
// http://stackoverflow.com/questions/18234491/two-sets-of-parentheses-after-function-call

// Redux Form is injecting some members into the component props that we can
// access, like this.props.handleSubmit

// Redux Form has the exact same behavior as connect.

// connect: 1st argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st arg is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title', 'categories', 'content'],
  validate
}, null, { createPost })(PostsNew);
