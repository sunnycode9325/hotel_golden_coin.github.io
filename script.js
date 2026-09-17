const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});
const heroBg = document.getElementById('heroBg');
window.addEventListener('scroll', () => {
  const y = Math.min(window.scrollY * .12, 80);
  heroBg.style.transform = `scale(1.04) translateY(${y}px)`;
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('in');
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const main = document.getElementById('galleryMain');
const caption = document.querySelector('.gallery-caption');
document.querySelectorAll('.thumb').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.thumb').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    main.style.opacity = '0';
    setTimeout(() => {
      main.src = btn.dataset.img;
      caption.innerHTML = `<span>01</span> ${btn.dataset.caption}`;
      main.onload = () => main.style.opacity = '1';
      main.onerror = () => { main.style.opacity='1'; };
    }, 180);
  });
});

const reviews = [...document.querySelectorAll('.review')];
let reviewIndex = 0;
function showReview(i){
  reviewIndex = (i + reviews.length) % reviews.length;
  reviews.forEach((r,n)=>r.classList.toggle('active',n===reviewIndex));
  document.getElementById('reviewIndex').textContent = `0${reviewIndex+1} / 0${reviews.length}`;
}
document.getElementById('prev').onclick = () => showReview(reviewIndex-1);
document.getElementById('next').onclick = () => showReview(reviewIndex+1);
setInterval(()=>showReview(reviewIndex+1), 7000);

document.getElementById('year').textContent = new Date().getFullYear();
