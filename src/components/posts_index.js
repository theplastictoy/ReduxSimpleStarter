import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPosts} from '../actions/index';
import { Link } from 'react-router';

class PostsIndex extends Component {
  // React calls this when our component is about to be rendered
  // One time only, not called in subsequent runs
  componentWillMount() {
    console.log('Will mount');
    this.props.fetchPosts();
  }

  renderPosts() {
    console.log('render-posts');
    return this.props.posts.map((post) => {
      return (
        <li className="list-group-item" key={post.id}>
          <Link to={"posts/" + post.id}>
            <span className="pull-xs-right">{post.categories}</span>
            <strong>{post.title}</strong>
          </Link>
        </li>
      )
    });
  }

  render() {
    console.log('render');
    return (
      <div>
        <div className="text-xs-right">
          <Link to="/posts/new" className="btn btn-primary">
            Add a Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts.all };
}

// Replaces the connect(null..) when adding mapStateToProps
export default connect(mapStateToProps, {fetchPosts})(PostsIndex);

// Shorthand syntax for the lines below (mapDispatchToProps)
// export default connect(null, {fetchPosts: fetchPosts})(PostsIndex);
// which is also equal to
// export default connect(null, {fetchPosts})(PostsIndex);

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({fetchPosts}, dispatch);
// }
//
// // null because we don't have any state to map
// export default connect(null, mapDispatchToProps)(PostsIndex);
