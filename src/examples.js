function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

function createNode(el) {
  return document.createElement(el);
}

function append(parent, el) {
  return parent.insertAdjacentHTML("beforeend", el.outerHTML);
}

const getUsers = async (path) => {
  try {
    $("#users ul").innerHTML = "";
    const data = await fetch(`https://jsonplaceholder.typicode.com/${path}`);
    if (!data.ok) {
      throw data;
    }
    const users = await data.json();
    users.forEach((user) => {
      const $li = createNode("li");
      $li.textContent = user.name;
      $("#users ul").append($li);
    });
  } catch (error) {
    throw new Error(500);
  }
};
const getPosts = async (path) => {
  try {
    $("#posts ul").innerHTML = "";
    const data = await fetch(`https://jsonplaceholder.typicode.com/${path}`);
    if (!data.ok) {
      throw data;
    }
    const posts = await data.json();
    posts.forEach((post) => {
      const $li = createNode("li");
      $li.textContent = post.title;
      $("#posts ul").append($li);
    });
  } catch (error) {
    throw new Error(500);
  }
};
const getAlbums = async (path) => {
  try {
    $("#albums ul").innerHTML = "";
    const data = await fetch(`https://jsonplaceholder.typicode.com/${path}`);
    if (!data.ok) {
      throw data;
    }
    const albums = await data.json();
    albums.forEach((album) => {
      const $li = createNode("li");
      $li.textContent = album.title;
      $("#albums ul").append($li);
    });
  } catch (error) {
    throw new Error(500);
  }
};
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const [users, posts, albums] = await Promise.all([
      getUsers('users'),
      getPosts('posts'),
      getAlbums('albums'),
    ]);
    // const $userSection = $("#users ul");
    // users.forEach((user) => {
    //   const $li = createNode("li");
    //   $li.textContent = user.name;
    //   $userSection.append($li);
    // });

    // const $postSection = $("#posts ul");
    // posts.forEach((post) => {
    //   const $li = createNode("li");
    //   $li.textContent = post.title;
    //   $postSection.append($li);
    // });

    // const $albumSection = $("#albums ul");
    // albums.forEach((album) => {
    //   const $li = createNode("li");
    //   $li.textContent = album.title;
    //   $albumSection.append($li);
    // });
  } catch (error) {
    console.log('error ==>', error);
  }
});
// window.addEventListener("DOMContentLoaded", async () => {
//   try {
//     const results = await Promise.allSettled([
//       getUsers("userss"),
//       getPosts("postss"),
//       getAlbums("albums"),
//     ]);
//     console.log("results ==>", results);
//     const [usersResponse, postsResponse, albumsResponse] = results;
//     let users,
//       posts,
//       albums = [];
//     if (usersResponse.status === "rejected") {
//       const retry = async (e) => {
//         users = await getUsers("users");
//       };
//       const $li = createNode("li");
//       const $a = createNode("a");
//       $a.textContent = "Reessayer";
//       $a.addEventListener("click", retry);
//       $li.append($a);
//       $("#users ul").append($li);
//     }
//     if (postsResponse.status === "rejected") {
//       const retry = async (e) => {
//         posts = await getPosts("posts");
//       };
//       const $li = createNode("li");
//       const $a = createNode("a");
//       $a.textContent = "Reessayer";
//       $a.addEventListener("click", retry);
//       $li.append($a);
//       $("#posts ul").append($li);
//     }
//     if (albumsResponse.status === "rejected") {
//       const retry = async (e) => {
//         albums = await getAlbums("albums");
//       };
//       const $li = createNode("li");
//       const $a = createNode("a");
//       $a.textContent = "Reessayer";
//       $a.addEventListener("click", retry);
//       $li.append($a);
//       $("#albums ul").append($li);
//     }
//   } catch (error) {
//     console.log("error ==>", error);
//   }
// });
