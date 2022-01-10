var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJob3N0IjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDAwMCIsImh0dHBzOi8vY29ubmVsbG1jY2FydGh5LmNvbSJdLCJpYXQiOjE2NDE3NDQ2Njd9.7Dv0xI60IIANn0PxyCf_4UR-1usidXMPYiKa3eyLHuk';
const swup = new Swup({
  plugins: [new SwupSlideTheme()],
  animateHistoryBrowsing: true
});
init();
swup.on('contentReplaced', init);
swup.on('contentReplaced', function () {
  window.scrollTo(0, 0);
});
function init() {
  const like_button = document.getElementById('like_button');
  const article_info = document.querySelector('.article-info');
  const back_button = document.querySelector('button#back');

  if (document.querySelector('button#video-controller')) {
    const button = document.querySelector('button#video-controller');
    const button_text = document.querySelector('span#button-text');
    const button_icon = document.querySelector('i#button-icon');
    button.addEventListener('click', () => {
      if (button_icon.classList.contains('fa-pause')) {
        document.getElementById('showreel').pause();
        button_icon.classList.replace('fa-pause', 'fa-play');
        button_text.innerText = 'Play video';
      } else {
        document.getElementById('showreel').play();
        button_icon.classList.replace('fa-play', 'fa-pause');
        button_text.innerText = 'Pause video';
      }
    });
  }
  if (document.getElementById('count')) {
    const count_element = document.getElementById('count');
    const slug = window.location.href.split('/')[4];
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", `https://data.connellmccarthy.com/.netlify/functions/api/article?ref=${slug}`, true);
    xhttp.setRequestHeader('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJob3N0IjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDAwMCIsImh0dHBzOi8vY29ubmVsbG1jY2FydGh5LmNvbSJdLCJpYXQiOjE2NDE3NDQ2Njd9.7Dv0xI60IIANn0PxyCf_4UR-1usidXMPYiKa3eyLHuk`);
    xhttp.send();
    xhttp.onload = function() {
      count_element.innerText = JSON.parse(xhttp.response).count;
    }
  }
  if (like_button) {
    const slug = window.location.href.split('/')[4];
    if (window.localStorage.getItem(slug)) {
      document.getElementById('like_button_icon').classList.replace('far', 'fas');
      like_button.classList.add('liked');
    }
    like_button.addEventListener('click', () => {
      if (!like_button.classList.contains('liked')) {
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", `https://data.connellmccarthy.com/.netlify/functions/api/article?ref=${slug}`, true);
        xhttp.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJob3N0IjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDAwMCIsImh0dHBzOi8vY29ubmVsbG1jY2FydGh5LmNvbSJdLCJpYXQiOjE2NDE3NDQ2Njd9.7Dv0xI60IIANn0PxyCf_4UR-1usidXMPYiKa3eyLHuk');
        xhttp.send();
        xhttp.onload = () => {
          like_button.classList.toggle('animate');
          document.getElementById('like_button_icon').classList.replace('far', 'fas');
          like_button.classList.add('liked');
          window.localStorage.setItem(slug, true);
          const count_element = document.getElementById('count');
          let count = parseInt(count_element.innerText) + 1;
          count_element.innerText = count;
        }
      } else {
        //Remove like
        let xhttp = new XMLHttpRequest();
        xhttp.open("DELETE", `https://data.connellmccarthy.com/.netlify/functions/api/article?ref=${slug}`, true);
        xhttp.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJob3N0IjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDAwMCIsImh0dHBzOi8vY29ubmVsbG1jY2FydGh5LmNvbSJdLCJpYXQiOjE2NDE3NDQ2Njd9.7Dv0xI60IIANn0PxyCf_4UR-1usidXMPYiKa3eyLHuk');
        xhttp.send();
        xhttp.onload = () => {
          like_button.classList.toggle('animate');
          document.getElementById('like_button_icon').classList.replace('fas', 'far');
          like_button.classList.remove('liked');
          window.localStorage.removeItem(slug);
          const count_element = document.getElementById('count');
          let count = parseInt(count_element.innerText) - 1;
          count_element.innerText = count;
        }
      }
    });
  }
  if (article_info) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 350 && !article_info.classList.contains('active')) {
        article_info.classList.toggle('active');
      } else if (window.scrollY < 350 && article_info.classList.contains('active')) {
        article_info.classList.toggle('active');
      }
    });
  }
  if (document.getElementById('mobile-announcements')) {
    document.getElementById('mobile-announcements').addEventListener('click', () => {
      document.querySelector('.announcement__container').classList.toggle('active');
      document.querySelector('button#mobile-announcements').classList.toggle('active');
    });
  }
  document.querySelectorAll('a').forEach((el) => {
    el.addEventListener('click', () => {
      switchPage(el.getAttribute('href'));
    });
  });
}
function switchPage(url) {
  if (document.querySelector('nav').classList.contains('active')) {
    document.querySelector('nav').classList.toggle('active');
    document.querySelector('.fade.menu-trigger').classList.toggle('active');
  }
  if (url.includes('/articles')) {
    if (document.getElementById('nav-work').classList.contains('active')) {
      document.getElementById('nav-articles').classList.add('active');
      document.getElementById('nav-work').classList.remove('active');
    }
  } else if (url == '/') {
    if (document.getElementById('nav-articles').classList.contains('active')) {
      document.getElementById('nav-work').classList.add('active');
      document.getElementById('nav-articles').classList.remove('active');
    }
  }
}

document.querySelectorAll('.sidebar-trigger').forEach((el) => {
  el.addEventListener('click', () => {
    document.querySelector('.sidebar').classList.toggle('active');
    document.querySelector('.fade.sidebar-trigger').classList.toggle('active');
  });
});

document.querySelectorAll('.menu-trigger').forEach((el) => {
  el.addEventListener('click', () => {
    document.querySelector('nav').classList.toggle('active');
    document.querySelector('.fade.menu-trigger').classList.toggle('active');
  });
});