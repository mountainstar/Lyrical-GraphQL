import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import styles from './style';

class LyricList extends Component {
  onLike(id, likes) {
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id,
          __typename: 'LyricType',
          likes: likes++
        }
      }
    });
  }
  renderLyrics() {
    return this.props.lyrics.map(({ id, content, likes }) => (
      <li key={id} className="collectionItem">
        {content}
        <div className="vote-box">
          {likes}
          <i
          style={styles.main}
          className="material-icons"
          onClick={() => this.onLike(id, likes)}
          >
            thumb_up
        </i>
        </div>
      </li>
    ))
  }
  render() {
    return (
      <ul className="collection">
        {this.renderLyrics()}
      </ul>
    );
  }
}

const mutation = gql`
mutation LikeLyric($id: ID){
  likeLyric(id: $id){
    id
    likes
  }
}
`;
export default graphql(mutation)(LyricList);
