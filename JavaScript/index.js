// 1 . fetch , load and show catagories on html

// create loadCategories
const loadCategories = () => {
  // Fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => DisplayCategories(data.categories))
    .catch((error) => console.log(error));
};
const loadVideo = () => {
  // Fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

const cardDemo = {
  category_id: "1003",
  video_id: "aaae",
  thumbnail: "https://i.ibb.co/Yc4p5gD/inside-amy.jpg",
  title: "Inside Amy Schumer",
  authors: [
    {
      profile_picture: "https://i.ibb.co/YD2mqH7/amy.jpg",
      profile_name: "Amy Schumer",
      verified: "",
    },
  ],
  others: {
    views: "3.6K",
    posted_date: "15147",
  },
  description:
    "'Inside Amy Schumer' is a comedy show by the popular comedian Amy Schumer, blending sharp satire and unfiltered humor to tackle everyday issues and societal norms. With 3.6K views, the show promises a blend of hilarious sketches, thought-provoking stand-up, and candid interviews. It's a must-watch for fans of bold, edgy comedy.",
};

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video");
  videos.forEach((video) => {
    console.log(video);
    // create card
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
    <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
    `;
    videoContainer.append(card);
  });
};
// category
// :
// "Music"
// category_id
// :
// "1001"
// create DisplayCategories
const DisplayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories");

  categories.forEach((item) => {
    console.log(item);

    // create a button
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = item.category;

    // add button to categories container
    categoriesContainer.append(button);
  });
};

loadCategories();
loadVideo();
