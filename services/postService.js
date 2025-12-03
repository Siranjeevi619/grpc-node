const post = require("../model/postModel");

async function CreatePost(call, callback) {
  const { title, content } = call.request;

  const newPost = await Post.create({ title, content });

  callback(null, {
    post: {
      id: newPost._id.toString(),
      title: newPost.title,
      content: newPost.content,
    },
  });
}

async function GetPostById(call, callback) {
  const { id } = call.request;

  const post = await Post.findById(id);

  if (!post) {
    return callback(new Error("Post not found"));
  }

  callback(null, {
    post: {
      id: post._id.toString(),
      title: post.title,
      content: post.content,
    },
  });
}

async function GetAllPosts(call, callback) {
  const posts = await Post.find();

  callback(null, {
    posts: posts.map((p) => ({
      id: p._id.toString(),
      title: p.title,
      content: p.content,
    })),
  });
}

async function UpdatePost(call, callback) {
  const { id, title, content } = call.request;

  const updatedPost = await Post.findByIdAndUpdate(
    id,
    { title, content },
    { new: true }
  );

  callback(null, {
    post: {
      id: updatedPost._id.toString(),
      title: updatedPost.title,
      content: updatedPost.content,
    },
  });
}

async function DeletePost(call, callback) {
  const { id } = call.request;

  await Post.findByIdAndDelete(id);

  callback(null, { message: "Post deleted successfully" });
}

module.exports = {
  CreatePost,
  GetPostById,
  GetAllPosts,
  UpdatePost,
  DeletePost,
};



