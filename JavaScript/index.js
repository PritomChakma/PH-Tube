function setTime(time) {
  const hour = parseInt(time / 3600);
  let remainingSecong = time % 3600;
  const munite = parseInt(remainingSecong / 60);
  remainingSecong = remainingSecong % 60;

  return `${hour} Hour ${munite} munite ${remainingSecong} second ago`;
}

// ***************
const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (const btn of buttons) {
    btn.classList.remove("active");
  }
};

// 1 . fetch , load and show catagories on html

// create loadCategories
const loadCategories = () => {
  // Fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => DisplayCategories(data.categories))
    .catch((error) => console.log(error));
};

// *********
const loadVideo = () => {
  // Fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

// **********
const loadCategoriesVideo = (id) => {
  //   alert(id);
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const activeBtn = document.getElementById(`btn-${id}`);
      //   remove acrive class start

      removeActiveClass();
      //   remove acrive class End
      activeBtn.classList.add("active");
      displayVideos(data.category);
    })
    .catch((error) => console.log(error));
};

// **********
const loadDetails = async (videoId) => {
  console.log(videoId);
  const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  const res = await fetch(uri);
  const data = await res.json();
  displayDetais(data.video);
};

// ***************
const displayDetais = (video) => {
  const detalContainer = document.getElementById("modal-content");

  detalContainer.innerHTML = `
  <img src=${video.thumbnail}/>
  <p>${video.description}</p>

  `;
  //   way-1
  document.getElementById("showModalData").click();
};

// *******************
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video");
  videoContainer.innerHTML = " ";

  if (videos.length === 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
    <div class="min-h-sceen w-full flex flex-col gap-5 justify-center items-center ">
    <img src="assest/Icon.png"  />

    <h2 class="text-xl font-bold text-center">
    Oopps!! Sorry, There is no <br />
    Content Here 
    </h2>
    </div>
    
    `;
    return;
  } else {
    videoContainer.classList.add("grid");
  }

  videos.forEach((video) => {
    console.log(video);
    // create card
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
    <figure class="h-[200px] relative">
    <img
      src="${video.thumbnail}"
      class="h-full w-full object-cover"
      alt="Shoes" />

${
  video.others.posted_date?.length === 0
    ? " "
    : `<span class="absolute text-xs right-2 bottom-2 bg-black text-white rounded p-1">${setTime(
        video.others.posted_date
      )}</span>`
}

      

  </figure>
  <div class="px-0 py-2 gap-2 flex">


<div><img class="w-10 h-10 rounded-full object-cover" src=${
      video.authors[0].profile_picture
    }/></div>


<div>
<h2 class="font-bold">${video.title}</h2>

<div class="flex gap-2 items-center">
<p class="text-gray-400">${video.authors[0].profile_name}</p>

${
  video.authors[0].verified === true
    ? `<img class="w-5 h-5 object-cover" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png" />`
    : " "
}

<div>
<p><button onclick="loadDetails('${
      video.video_id
    }') " class="btn btn-sm btn-error">Details</button></p>
</div>


  </div>
    `;
    videoContainer.append(card);
  });
};

const DisplayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories");

  categories.forEach((item) => {
    console.log(item);

    // create a button
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <button id="btn-${item.category_id}" onclick=" loadCategoriesVideo(${item.category_id})" class="btn category-btn">${item.category}</button>
    `;
    // add button to categories container
    categoriesContainer.append(buttonContainer);
  });
};

loadCategories();
loadVideo();
