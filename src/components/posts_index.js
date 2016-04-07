import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPosts} from '../actions/index';
import { Link } from 'react-router';

class PostsIndex extends Component {
  // React calls this when our component is about to be rendered
  // One time only, not called in subsequent runs
  componentWillMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link to="/posts/new" className="btn btn-primary">
            Add a Post
          </Link>
        </div>
      List of blog posts</div>
    );
  }
}

// Shorthand syntax for the lines below (mapDispatchToProps)
export default connect(null, {fetchPosts: fetchPosts})(PostsIndex);
// which is also equal to
export default connect(null, {fetchPosts})(PostsIndex);

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({fetchPosts}, dispatch);
// }
//
// // null because we don't have any state to map
// export default connect(null, mapDispatchToProps)(PostsIndex);
