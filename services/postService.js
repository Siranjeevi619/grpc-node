const postModel = require("../model/postModel");

async function CreatePost(call, callback) {
  try {
    const { title, caption, userId } = call.request;
    const newPost = await postModel.create({ title, caption, userId });

    callback(null, {
      post: {
        id: newPost._id.toString(),
        title: newPost.title,
        caption: newPost.caption,
        userId: newPost.userId,
      },
    });
  } catch (err) {
    callback(err, null);
  }
}

async function GetPostById(call, callback) {
  try {
    const { id } = call.request;
    const post = await postModel.findById(id);

    if (!post) return callback(new Error("Post not found"));

    callback(null, {
      post: {
        id: post._id.toString(),
        title: post.title,
        caption: post.caption,
      },
    });
  } catch (err) {
    callback(err, null);
  }
}

async function GetAllPost(call, callback) {
  try {
    const posts = await postModel.find();

    callback(null, {
      posts: posts.map((p) => ({
        id: p._id.toString(),
        title: p.title,
        caption: p.caption,
      })),
    });
  } catch (err) {
    callback(err, null);
  }
}

async function UpdatePost(call, callback) {
  try {
    const { id, title, caption } = call.request;
    const updatedPost = await postModel.findByIdAndUpdate(
      id,
      { title, caption },
      { new: true }
    );

    if (!updatedPost) return callback(new Error("Post not found"));

    callback(null, {
      post: {
        id: updatedPost._id.toString(),
        title: updatedPost.title,
        caption: updatedPost.caption,
      },
    });
  } catch (err) {
    callback(err, null);
  }
}

async function DeletePost(call, callback) {
  try {
    const { id } = call.request;
    const existing = await postModel.findById(id);

    if (!existing) {
      return callback(null, {
        message: "Post not found",
      });
    }
    await postModel.findByIdAndDelete(id);

    callback(null, { message: "Post deleted successfully" });
  } catch (err) {
    callback(err, null);
  }
}

const GetPostsByUser = async (call, callback) => {
  try {
    const { userId } = call.request;

    const posts = await postModel.find({ userId });

    callback(null, {
      posts: posts.map((p) => ({
        id: p._id.toString(),
        title: p.title,
        caption: p.caption,
        userId: p.userId,
      })),
    });
  } catch (err) {
    callback(err, null);
  }
};

module.exports = {
  GetPostsByUser,
  CreatePost,
  GetPostById,
  GetAllPost,
  UpdatePost,
  DeletePost,
};
