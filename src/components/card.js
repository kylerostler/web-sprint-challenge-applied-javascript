import axios from "axios";

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //
  
  //create elements
  const cardContainer = document.createElement('div');
  const cardHeadline = document.createElement('div');
  const cardAuthor = document.createElement('div');
  const imageContainer = document.createElement('div');
  const image = document.createElement('img');
  const credits = document.createElement('span');
  //add classes
  cardContainer.classList.add('card');
  cardHeadline.classList.add('headline');
  cardAuthor.classList.add('author');
  imageContainer.classList.add('img-container');
  //add text
  cardHeadline.textContent = `${article.headline}`;
  image.src = article.authorPhoto;
  credits.textContent = `${article.authorName}`
  //add heirarchy
  cardContainer.appendChild(cardHeadline);
  cardContainer.appendChild(cardAuthor);
  cardAuthor.appendChild(imageContainer);
  imageContainer.appendChild(image);
  cardAuthor.appendChild(credits);
  //return top element
  cardContainer.addEventListener('click', () => console.log(`${article.headline}`));
  return cardContainer;
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `https://localhost:5000/api/articles` (test it in Postman/HTTPie!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
  const entryPt = document.querySelector(selector);
  axios.get('http://localhost:5000/api/articles')
  .then(resp => {
    const articlesObj = resp.data.articles;
    const articlesArray = Object.keys(articlesObj);

    for (let i = 0; i < articlesArray.length; i++) {
      const articleData = resp.data.articles[articlesArray[i]];
      for (let i = 0; i < articleData.length; i++) {
      entryPt.appendChild(Card(articleData[i]));
      }
    }
  }).catch(error => {
    console.error(error);
  })
}




export { Card, cardAppender }

