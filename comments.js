// Create web server
// 1. Create a web server
// 2. Read the comments from the file
// 3. Write the comments to the file
// 4. Redirect the user to the comments page
// 5. Show the comments to the user

// 1. Create a web server
const express = require('express');
const app = express();

// 2. Read the comments from the file
const fs = require('fs');
const path = require('path');
const commentsPath = path.join(__dirname, 'comments.json');

// 3. Write the comments to the file
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

// 4. Redirect the user to the comments page
app.post('/comments', (req, res) => {
    // 3. Write the comments to the file
    const comments = JSON.parse(fs.readFileSync(commentsPath));
    const newComment = {
        name: req.body.name,
        comment: req.body.comment
    };
    comments.unshift(newComment);
    fs.writeFileSync(commentsPath, JSON.stringify(comments, null, 4));

    // 4. Redirect the user to the comments page
    res.redirect('/comments');
});

// 5. Show the comments to the user
app.get('/comments', (req, res) => {
    // 5. Show the comments to the user
    const comments = JSON.parse(fs.readFileSync(commentsPath));
    const commentList = comments.map(comment => {
        return `<li>${comment.name}: ${comment.comment}</li>`;
    });
    const commentListHTML = commentList.join('');
    const html = `
        <!DOCTYPE html>
        <html>
            <head>
                <title>Comments</title>
            </head>
            <body>
                <h1>Comments</h1>
                <ul>
                    ${commentListHTML}
                </ul>
                <form action="/comments" method="POST">
                    <label for="name">Name:</label>
                    <input type="text" name="name" id="name" />
                    <label for="comment">Comment:</label>
                    <input type="text" name="comment" id="comment" />
                    <input type="submit" value="Submit" />
                </form>
            </body>
        </html>
    `;
    res.send(html);
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});