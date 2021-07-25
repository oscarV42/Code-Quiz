// capturing html elements into varaibles
var backBtn = document.querySelector('.go-back');
var clearBtn = document.querySelector('.clear');
var score_list = document.querySelector('#highscores');
// creating list array for potential local storage items
var list = [];

// event listener for go back button
backBtn.addEventListener('click', function(){
    // sends user to code quiz webpage
    location.href = '/index.html'
});

// initial function
function init(){
    // grabs item from local storage, uses
    // JSON.parse and stores it into a variable
    var user_info = JSON.parse(localStorage.getItem('user-cred'));
    // stores parsed info into list array
    list = user_info;
    // logs user_info
    console.log(user_info);
    // calls renderlist function
    renderList();
}

// renders the highscore list to be displayed on screen
function renderList(){
    // this method sorts the highscore list numerically
    list.sort(function (a,b) {
        // sets list from greatest to least
        return  b.replace( /^\D+/g, '') - a.replace( /^\D+/g, '');
    });
    // logs organized list of highscores
    console.log(list);
    // for as long as the list length
    for(var i = 0; i < list.length; i++){     
        // creating list element into declared variable  
        var score = document.createElement('li');
        // sets list text which includes hgihscore initial and score
        score.textContent = (i + 1)+'. '+list[i].replace(/[0-9]/g, '')+' ------------- '+list[i].replace( /^\D+/g, '');
        // checks if i divided by 2 has no remainders
        if(i % 2 === 0){
            // sets the score list item with a background color and
            // opacity to give design to our highscore list
            score.setAttribute('style', 'background-color: #088138; opacity: 0.7;');
        }
        // appends our created list item to our parent element 
        score_list.appendChild(score);
    }

}

// calls initial function
init();

// adds event listener to the clear button
document.querySelector('.clear').addEventListener('click', function(){
    // clears our highscore text 
    score_list.textContent = ' ';
    // clearing local storage
    localStorage.clear();
})