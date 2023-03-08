import { Axios } from './@core';

const FORM_TYPE = 'multipart/form-data';

const CommentApi = {
  commentLikes(commentId, isLike) {
    return Axios().post(`${commentId}/like?isLike=${isLike}`);
  },

  addNewComment(postId, formData) {
    return Axios(FORM_TYPE).post(`${postId}/comment/new`, formData);
  },

  editComment(challengeId, commentId, formData) {
    return Axios(FORM_TYPE).post(`${challengeId}/comment/${commentId}`, formData);
  },
};

export default CommentApi;
