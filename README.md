## Welcome to my journal project!

This is a labor of love, and is used as a way for me to have a private journal that exists nowhere else but my own computer.  I can save and comment on YouTube videos, pictures I've taken, and articles I've read.

The project started out on a Jekyll blog template.  I would write journal entries in Sublime text with "front matter" that included the title, date, and category of the blog post.  Then I would save it in the posts folder.  It would be compiled as static content and served up with the jekyll serve command.

That got me in the habit of writing and keeping a journal, but I soon wanted more control and a better way to enter, edit, and read posts.

Somewhere around that time I came across Angular JS and I loved it!  I started small with a read and write pane and slowly added features.  

After Angular 2 came out, I rewrote everything, and upgraded again when Angular 5 came out.  I'm using Bootstrap for style and functionality.

## Write

The write pane has a toolbar to insert hyperlinks for images, YouTube videos, links to articles, and raw HTML (when I can't get it done with those three).  Also, the weather and current date are inserted into every new blog post.

When I choose an image to insert from my computer, it hits the Node.js server that uploads it to a folder and then serves it up locally.  That way I always have the images if I move them on my computer.

When I insert a YouTube link, the Node.js server makes a call to my Google YouTube API that grabs the title and a thumbnail image.  It inserts that as a hyperlink.  I tried using an iframe, but the Angular pipe I use to convert Markdown reloads the iframe image every time I type anything in the edit pane, and it gets on my nerves.  

The insert URL also hits the Node.js server to grab the title of the page using the Cheerio library and inserts it as a hyperlink.  

![Write Screen](https://user-images.githubusercontent.com/11249870/58663572-af313180-82e1-11e9-9055-0cc7668dddef.JPG)

## Read

The read pane has two layouts.  The first has a list of posts on the left with a paginator at the bottom.  There is also a search box to find text in any post, a bookmarked toggle to select only bookmarked posts, a sort date that will reverse sort, and an alternate view that shows the posts on square cards instead of a list (that still needs some attention).  

![Read Screen 1](https://user-images.githubusercontent.com/11249870/58662255-9d01c400-82de-11e9-8569-2c7b53f6f6e7.JPG)

There are edit post, delete, and bookmark buttons on the top of the post.  If you click Edit Post, the edit pane will appear on the left where you can edit and update the post.  

A Show List button appears at the top of the formatted page to return to the list after editing.  

![Read Screen 2](https://user-images.githubusercontent.com/11249870/58663521-8f017280-82e1-11e9-8b3d-51b440c74596.JPG)

## YouTube download

I also added the ability to download YouTube videos and convert them to MP3.  This still needs some polish, but the general functionality works.  

After pasting the YouTube url in the top box, click on the YouTube button and it will retrieve the info from YouTube, including the thumbnail image.  I tried to use the description and title from YouTube to separate phrases that could be the artist, title, album, and description, but the inputs from people are very different and it's hard to get a one size fits all recipe for this.  These different phrases are available in the dropdowns to populate the fields and are editable also.

Once you're satisfied with the info and all of the fields are populated, click download and it will hit the Node.js server, use the youtube-dl library, and will download the video and convert it to MP3. 

The get and set tags is a work in progress.  It uses the node-id3 library to read and write ID3 tags to the file that was just saved.  

![YouTube Download](https://user-images.githubusercontent.com/11249870/58663625-bf491100-82e1-11e9-8cd1-e69dee043068.JPG)

**Note:  This will not work out of the box.  There are API calls to retrieve YouTube video information and Elasticsearch needs to be running with an index available.  The Node.js server must be running to add images, retrieve URL and YouTube info, or download YouTube videos.  You can learn more about the YouTube API here ![YouTube Data API](https://developers.google.com/youtube/v3/getting-started)

