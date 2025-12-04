const Comment = require("../model/commentModel");

exports.AddComment = async (call, callback) => {
  try {
    const { postId, userId, text } = call.request;

    const comment = await Comment.create({ postId, userId, text });

    callback(null, {
      comment: {
        id: comment._id.toString(),
        postId: comment.postId,
        userId: comment.userId,
        text: comment.text,
      },
    });
  } catch (err) {
    callback(err, null);
  }
};

exports.GetCommentsByPost = async (call, callback) => {
  try {
    const { postId } = call.request;

    const comments = await Comment.find({ postId });

    callback(null, {
      comments: comments.map((c) => ({
        id: c._id.toString(),
        postId: c.postId,
        userId: c.userId,
        text: c.text,
      })),
    });
  } catch (err) {
    callback(err, null);
  }
};

exports.GetCommentsByUser = async (call, callback) => {
  try {
    const { userId } = call.request;

    const comments = await Comment.find({ userId });

    callback(null, {
      comments: comments.map((c) => ({
        id: c._id.toString(),
        postId: c.postId,
        userId: c.userId,
        text: c.text,
      })),
    });
  } catch (err) {
    callback(err, null);
  }
};
