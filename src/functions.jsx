function getTimeAgo(time) {
    let timeAgo = Math.floor((Date.now() - time) / 1000);
    if ( timeAgo == 0) {
        return "now";
    } else if ( timeAgo < 60) {
        return `${timeAgo}s`;
    } else if ( timeAgo < 60*60 ) {
        timeAgo = Math.floor(timeAgo/60);
        if (timeAgo == 1) {
            return `${timeAgo} minute ago`;
        } else {
            return `${timeAgo} minutes ago`;
        }
    } else if ( timeAgo < 60*60*24 ) {
        timeAgo = Math.floor(timeAgo/(60*60));
        if (timeAgo == 1) {
            return `${timeAgo} hour ago`;
        } else {
            return `${timeAgo} hours ago`;
        }
    } else if ( timeAgo < 60*60*24*7 ) {
        timeAgo = Math.floor(timeAgo/(60*60*24));
        if (timeAgo == 1) {
            return `${timeAgo} day ago`;
        } else {
            return `${timeAgo} days ago`;
        }
    } else if ( timeAgo < 60*60*24*30 ) {
        timeAgo = Math.floor(timeAgo/(60*60*24*7));
        if (timeAgo == 1) {
            return `${timeAgo} week ago`;
        } else {
            return `${timeAgo} weeks ago`;
        }
    } else if ( timeAgo < 60*60*24*30*12 ) {
        timeAgo = Math.floor(timeAgo/(60*60*24*30));
        if (timeAgo == 1) {
            return `${timeAgo} month ago`;
        } else {
            return `${timeAgo} months ago`;
        }
    } else {
        timeAgo = Math.floor(timeAgo/(60*60*24*30*12));
        if (timeAgo == 1) {
            return `${timeAgo} year ago`;
        } else {
            return `${timeAgo} years ago`;
        }
    }
} 
export function updateTime() {
    let comments = JSON.parse(window.localStorage.getItem("comments"));
    return comments.map(comment => {
        comment.createdAt = getTimeAgo(comment.createdTime);
        if(comment.replies) {
            comment.replies.map(reply => {
                reply.createdAt = getTimeAgo(reply.createdTime);
                if (reply.replies) {
                    reply.replies.map(reply => {
                        reply.createdAt = getTimeAgo(reply.createdTime);
                        return reply;
                    })
                }
                return reply;
            })
        }
        return comment;
    })
}