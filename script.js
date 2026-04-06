document.addEventListener("DOMContentLoaded", () => {

  const searchInput = document.getElementById('menuSearch');
  const menuCards = document.querySelectorAll('.menu-card');

  if (!searchInput) return;

  const resultsDiv = document.createElement('div');
  resultsDiv.id = 'searchResults';
  resultsDiv.className = 'search-results';
  searchInput.parentNode.appendChild(resultsDiv);

  const scrollButtons = document.querySelectorAll('[data-target]');
  scrollButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-target');
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        resultsDiv.style.display = 'none';

      }
    });
  });

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    resultsDiv.innerHTML = '';

    if (query.length > 0) {
      let foundCount = 0;
      menuCards.forEach(card => {
        const title = card.querySelector('h3').textContent;
        const imgSrc = card.querySelector('img').src;

        if (title.toLowerCase().includes(query)) {
          foundCount++;

          const item = document.createElement('div');
          item.className = 'result-item';
          item.innerHTML = `
                        <img src="${imgSrc}">
                        <span class="title">${title}</span>
                    `;

          item.addEventListener('click', () => {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            card.classList.add("highlighted");
            setTimeout(() => card.classList.remove("highlighted"), 2500);
            resultsDiv.style.display = 'none';
            searchInput.value = '';
          });
          resultsDiv.appendChild(item);
        }
      });
      resultsDiv.style.display = foundCount > 0 ? 'block' : 'none';
    } else {
      resultsDiv.style.display = 'none';
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('main, section, footer').forEach(el => observer.observe(el));

  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !resultsDiv.contains(e.target)) {
      resultsDiv.style.display = 'none';
    }
  });
});

window.addEventListener('scroll', () => {
  let current = "";
  const sections = document.querySelectorAll('section[id], main[id], footer[id]');
  const scrollPosition = window.scrollY || document.documentElement.scrollTop;
  const isAtBottom = (window.innerHeight + scrollPosition) >= document.documentElement.scrollHeight - 50;

  if (isAtBottom) {
    current = "contact";
  } else {
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (scrollPosition >= sectionTop - 180) {
        current = section.getAttribute("id");
      }
    });
  }

  document.querySelectorAll(".menu li a").forEach((a) => {
    a.classList.remove("active-link");
    if (a.getAttribute("data-target") === current) {
      a.classList.add("active-link");
    }
  });
});

const comments = [
  {
    name: "Ziya Altunbay",
    comment: "Künefenin şerbeti ve Antep fıstığı tadı künefeyi çok güzel bir hale getirmiş. Mezeleri bence gayet yeterli Balgat’ta tercih edebileceğiniz bir yer.",
    rating: 5
  },
  {
    name: "Tuncay Bulut",
    comment: "Ankara'da İzzet ikramına hayran kaldığım nadir mekanlardan. Süt, çay, kuruyemiş istemenize fırsat tanımadan yenileniyor",
    rating: 5
  },
  {
    name: "Zehra Hayla",
    comment: "Güler yüzlü personeli, birbirinden lezzetli meyveler ve künefeleri efsane ( benim künefem peynirli paşa) çay ise harika kesinlikle tavsiye ederim.",
    rating: 5
  },
  {
    name: "Senanur Gürler",
    comment: "Annemle babamın evlilik yıl dönümü için gittik. Müdür bey çok ilgilendi ve özel olarak kutlamamızı sağladı. Künefenin üzerine yazı yazıp maytap eşliğinde kutladılar. Çaylar ikramdı. Hasır künefesini özellikle tavsiye ederiz. Nezih ve sakin bir ortam. İlgileri için teşekkür ederiz.",
    rating: 5
  },
  {
    name: "Emre Dedeli",
    comment: "Ankarada tatli konusunda tek adresim. Özellikle Balgat şubesinin çalışanları ve kunefe ustası cok ilgiliydi. Emeklerine ve ellerine sağlık.",
    rating: 5
  },
  {
    name: "Şahin Çilek",
    comment: "İşletme sahibi ve çalışan ekibiyle birlikte tam bi aile ortamı lezzet ve sıcak karşılamalarından dolayı hanzade balgat şubesine çok teşekkür ederim",
    rating: 5
  },
  {
    name: "Later Economi",
    comment: "Fiyat performans ve ikramları da güzeldi üstelik garsonlar kibardi. Kunefe ustası oğluma yapımını gösterdi ortam da nezih ve sakindi. Tavsiye ederim",
    rating: 5
  },
  {
    name: "Serkan Kozulu",
    comment: "Adamlar belli standartlar getirdiler künefe işine, kazandıkları her kuruş helal olsun.",
    rating: 5
  },
  {
    name: "Mehmet",
    comment: "Alkış gösterileri ile mükemmel bir akşam geçirdik. Personeli çok güleryüzlüydü. Tekrardan gidilir. Teşekkürler Hanzade künefe",
    rating: 5
  },
  {
    name: "Moonkhan Lawyer",
    comment: "Katmer ve künefenin tadına bakma şansı buldum, çok lezzetli idi. Tatlı öncesi gelen meyve, çerez atıştırmalıklar tazeydi. Tatlının yanında süt ikramı da var ve tatlının yanında çok iyi oluyor. Çalışanlar inanılmaz pozitif. Kesinlikle tavsiye ediyorum.",
    rating: 5
  },
  {
    name: "U.D",
    comment: "Buraya ne yazsam az kalır ya. Hem eğlenceli bir yer. Sıra gecesi vibe veriyor. Hem künefesi, katmeri harika. İkramlar yeterli, çay sınırsız. Tavsiye edilir.",
    rating: 5
  },
  {
    name: "Bayram ALKAYA",
    comment: "Bu arkadaşlar gerçekten künefe işini mükemmel yapıyor tebrik ederiz...",
    rating: 5
  },
  {
    name: "Mert Barındık",
    comment: "Normalde kolay kolay 5 yıldız vermem ama burası harika. Meyveleri taze, çay fıstık süt geliyor. Ailecek gidiyoruz ve o künefe... anlayamazsınız.",
    rating: 5
  },
  {
    name: "Ozcinar Eren",
    comment: "Tatlıları ve güleryüzlü personelleriyle mükemmel bir işletme. Ailenizle rahatça gelebilirsiniz. Hanzade ekibine misafirperverliğinden dolayı ailecek teşekkür ediyoruz.",
    rating: 5
  },
  {
    name: "Amine DALKILIÇ",
    comment: "Her şey çok güzel, ikramları bol. Siz sadece künefe sipariş ediyorsunuz, onlar size mevsim meyvesi ve süt ile künefe getiriyor. Çay ikramı da var. Mekan çok güzel.",
    rating: 5
  },
  {
    name: "Ali Kemal Şahin",
    comment: "Tek kelimeyle mükemmel. Kendi ürünleri olan fıstığı kullanıyorlar. Katmer, hasır ve künefe yedik. Üçü de birbirinden güzeldi.",
    rating: 5
  },
  {
    name: "Hasan PLL",
    comment: "Civarda bulunan çoğu künefeciyi ezer bu mekan. Künefe ve kadayıfları yediğinizde ağızda şire tadı kalmıyor. Gerçekten hem lezzetli hem nezih bir yer.",
    rating: 5
  },
  {
    name: "Caglar Ozenc",
    comment: "Üç arkadaş gittik, lezzetten bayıldık. Favorilere ekledik, maşallah size.",
    rating: 5
  },
  {
    name: "Semanur Kayretli Karakol",
    comment: "Künefesi, servisi güzel. Garson arkadaşlar çok güler yüzlü. Çocukları seviyorlar. Şarkıları da çok eğlenceli.",
    rating: 5
  },
  {
    name: "Emre Marmara",
    comment: "Dinlerken muazzam künefeleri yiyebileceğiniz mekan. Hizmet, muhabbet, lezzet on numara. Gidin!",
    rating: 5
  }
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("yorumGrid");

  function renderComments() {
    grid.classList.add("fade-out");

    setTimeout(() => {
      grid.innerHTML = "";

      const randomThree = shuffle([...comments]).slice(0, 3);

      randomThree.forEach(c => {
        const stars = "⭐".repeat(c.rating);

        const card = document.createElement("div");
        card.classList.add("yorum-card");

        card.innerHTML = `
          <h3>${c.name}</h3>
          <div class="stars">${stars}</div>
          <p>${c.comment}</p>
        `;

        grid.appendChild(card);
      });

      grid.classList.remove("fade-out");
      grid.classList.add("fade-in");

    }, 500);
  }

  renderComments();
  setInterval(renderComments, 5000);
});

const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 1000) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

const yorumSection = document.getElementById("yorumlar");

function revealYorumlar() {
  const windowHeight = window.innerHeight;
  const elementTop = yorumSection.getBoundingClientRect().top;
  const revealPoint = 120;

  if (elementTop < windowHeight - revealPoint) {
    yorumSection.classList.add("active");
  }
}

window.addEventListener("scroll", revealYorumlar);

const hamburger = document.getElementById("hamburger");
const menu = document.querySelector(".menu");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    menu.classList.toggle("active");
  });
}

let lastScrollY = window.scrollY;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    navbar.classList.add("hide");
  } else {
    navbar.classList.remove("hide");
  }

  lastScrollY = currentScrollY;
});

const cities = [
  "Ankara'nın En Lezzetli Künefesi",
  "İstanbul'un En Lezzetli Künefesi",
  "Eskişehir'in En Lezzetli Künefesi",
  "Türkiye'nin En Lezzetli Künefesi"
];

let cityIndex = 0;
const cityElement = document.getElementById("city");

setInterval(() => {
  cityElement.style.opacity = 0;

  setTimeout(() => {
    cityIndex = (cityIndex + 1) % cities.length;
    cityElement.textContent = cities[cityIndex];
    cityElement.style.opacity = 1;
  }, 300);

}, 2500);

window.changeMap = function (branch) {

  const maps = {

    balgat: "https://www.google.com/maps?q=Hanzade+Künefe+Balgat&output=embed",

    sincan: "https://www.google.com/maps?q=Hanzade+Künefe+Sincan&output=embed",

    altindag: "https://www.google.com/maps?q=Hanzade+Künefe+Altındağ&output=embed",

    istanbul: "https://www.google.com/maps?q=Hanzade+Künefe+Sultanbeyli&output=embed",

    eskisehir: "https://www.google.com/maps?q=Hanzade+Künefe+Eskişehir&output=embed"

  };

  document.getElementById("mapFrame").src = maps[branch];

}

document.addEventListener("DOMContentLoaded", function () {

  const videos = Array.from(document.querySelectorAll(".auto-slide"));
  let currentIndex = 0;

  function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
  }

  let shuffledVideos = shuffle(videos);

  function playVideo(index) {
    shuffledVideos.forEach((v) => {
      v.classList.remove("active");
      v.pause();
      v.currentTime = 0;
      v.muted = true;
    });

    const video = shuffledVideos[index];
    video.classList.add("active");
    video.play();

    video.addEventListener("click", function () {
      video.muted = !video.muted;
    });

    video.onended = function () {
      currentIndex++;
      if (currentIndex >= shuffledVideos.length) {
        currentIndex = 0;
        shuffledVideos = shuffle(videos); // tekrar rastgele sırala
      }
      playVideo(currentIndex);
    }
  }

  playVideo(currentIndex);

});
