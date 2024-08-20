import data from "./data.json";
import amyrobson from "./images/avatars/image-amyrobson.png";
import ramsesmiron from "./images/avatars/image-ramsesmiron.png";
import maxblagun from "./images/avatars/image-maxblagun.png";
import user from "./images/avatars/image-juliusomo.png";
data.currentUser.image.png = user;
let comments = data.comments,
    millisecondsInDay = 1000*60*60*24;
comments[0].user.image.png = amyrobson;
comments[0].createdTime = Date.now() - (millisecondsInDay*30);
comments[1].user.image.png = maxblagun;
comments[1].createdTime = Date.now() - (millisecondsInDay*14);
comments[1].replies[0].user.image.png = ramsesmiron;
comments[1].replies[0].createdTime = Date.now() - (millisecondsInDay*7);
comments[1].replies[1].user.image.png = user;
comments[1].replies[1].createdTime = Date.now() - (millisecondsInDay*2);


export default data;