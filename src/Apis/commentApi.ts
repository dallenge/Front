import { Axios } from './@core';

const FORM_TYPE = 'multipart/form-data';

const CommentApi = {
  getUserComments(userId: string | null, params: { size?: number; page?: number; sort?: string }) {
    return Axios().get(`/user/${userId}/comment`, { params });
  },

  commentLikes(commentId: string, isLike: number) {
    return Axios().post(`${commentId}/like?isLike=${isLike}`);
  },

  addNewComment(postId: number, formData: FormData) {
    return Axios(FORM_TYPE).post(`${postId}/comment/new`, formData);
  },

  editComment(challengeId: string, commentId: string, formData: FormData) {
    return Axios(FORM_TYPE).post(`${challengeId}/comment/${commentId}`, formData);
  },

  deleteComment(challengeId: number, commentId: number) {
    return Axios(FORM_TYPE).delete(`${challengeId}/comment/${commentId}`);
  },
};

export default CommentApi;
