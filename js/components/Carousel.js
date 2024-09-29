export default function Carousel() {
    const carousel = document.getElementById('carousel');
    const images = [
        '../images/image1.jpg',
        '../images/image2 (1).jpg',
        '../images/image3.jpg',
        '../images/image4.jpg',
        '../images/image5.jpg',
        '../images/image6.jpg'
    ];

    let currentSlide = 0;

    carousel.innerHTML = `
        <div class="relative w-full aspect-video overflow-hidden rounded-xl shadow-xl">
            <div class="flex transition-transform duration-500 ease-in-out">
                ${images.map(src => `<img src="${src}" alt="Slide" class="w-full h-full object-cover flex-shrink-0">`).join('')}
            </div>
            <button class="prev absolute top-1/2 left-4 -translate-y-1/2 bg-white bg-opacity-80 text-gray-800 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all">&#10094;</button>
            <button class="next absolute top-1/2 right-4 -translate-y-1/2 bg-white bg-opacity-80 text-gray-800 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all">&#10095;</button>
        </div>
    `;

    const slideContainer = carousel.querySelector('.flex');
    const prevButton = carousel.querySelector('.prev');
    const nextButton = carousel.querySelector('.next');

    function showSlide(index) {
        currentSlide = index;
        slideContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    prevButton.addEventListener('click', () => {
        showSlide((currentSlide - 1 + images.length) % images.length);
    });

    nextButton.addEventListener('click', () => {
        showSlide((currentSlide + 1) % images.length);
    });

    setInterval(() => {
        showSlide((currentSlide + 1) % images.length);
    }, 5000);
}