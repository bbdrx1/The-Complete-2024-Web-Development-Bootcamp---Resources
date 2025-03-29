$(document).ready(function() {
    alert("Hello, World!");
    
    const words = "Hello, World!".split("");
    words.forEach((letter, index) => {
        let $span = $("<span></span>").text(letter).addClass("hello");
        $("body").append($span);
        
        setTimeout(() => {
            $span.css({
                opacity: 1,
                transform: `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px)`
            });
        }, index * 200);
    });
});
