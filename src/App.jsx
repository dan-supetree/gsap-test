import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

function App() {
  // const smoother = useRef();
  const scrollWrapper = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const leftBoxes = self.selector(".boxes.left .box");
      const rightBoxes = self.selector(".boxes.right .box");
      const panelsContainer = self.selector(".panels-container");
      const panels = gsap.utils.toArray("article");
      const floatingBox = self.selector(".floating-box");

      gsap.from("h2", {
        opacity: 0,
        y: 100,
        ease: "power3",
        duration: 2,
      });

      leftBoxes.forEach((box) => {
        gsap.to(box, {
          x: -innerWidth + 150,
          scrollTrigger: {
            trigger: box,
            start: "center center",
            end: "+=400",
            scrub: true,
          },
        });
      });

      rightBoxes.forEach((box) => {
        gsap.to(box, {
          x: innerWidth - 150,
          scrollTrigger: {
            trigger: box,
            start: "center center",
            end: "+=400",
            scrub: true,
            markers: true,
          },
        });
      });

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: ".sectionPin",
          pin: true,
          scrub: 1,
          markers: true,
          snap: 1 / (panels.length - 1),
          end: () => "+=" + panelsContainer[0].offsetWidth,
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".section",
          start: "top top",
          scrub: 1,
          pin: true,
        },
      });

      tl.to(floatingBox, {
        rotate: 360,
        duration: 1,
      });
      tl.to(floatingBox, {
        xPercent: 400,
        yPercent: 400,
        duration: 1.5,
      });
      tl.to(floatingBox, {
        xPercent: -400,
        yPercent: 800,
        duration: 1.5,
      });
      tl.to(floatingBox, {
        xPercent: 500,
        yPercent: 100,
        duration: 1.5,
        borderRadius: 100,
        onComplete: () => {
          gsap.to(floatingBox, {
            keyframes: [
              { scale: 1.5 },
              { scale: 1.25 },
              { scale: 1.25 },
              { scale: 1.5 },
              { scale: 1 },
            ],
            ease: "power3",
            repeat: -1,
            duration: 1.25,
            onComplete: () => {
              gsap.to(floatingBox, {});
            },
          });
        },
      });
    }, scrollWrapper);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div id="smooth-content" ref={scrollWrapper}>
      <div className="floating-box" />
      <section className="description panel white">
        <h2>Smooth Scrolling View</h2>
      </section>
      <section className="panel col position-relative">
        <h3>Effects</h3>
        <div className="boxes-wrapper">
          <div className="boxes-container">
            <div className="boxes left">
              <div className="box">1</div>
              <div className="box">2</div>
              <div className="box">3</div>
            </div>
          </div>
          <div className="boxes-container">
            <div className="boxes right">
              <div className="box">1</div>
              <div className="box">2</div>
              <div className="box">3</div>
            </div>
          </div>
        </div>
      </section>
      <section data-scroll-container>
        <div className="panel white"></div>
        <section className="sectionPin">
          <div className="panels-container">
            <article className="panel red">One</article>
            <article className="panel orange">Two</article>
            <article className="panel yellow">Three</article>
            <article className="panel green">Four</article>
            <article className="panel gray">Five</article>
          </div>
        </section>
        <section className="panel full-screen">End</section>
      </section>
    </div>
  );
}

export default App;
