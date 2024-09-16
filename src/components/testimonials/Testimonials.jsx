import "./testimonials.css";
import student1 from "./pict/student 1.jpg";
import student2 from "./pict/student 2.jpg";
import student3 from "./pict/student 3.jpg";
import student4 from "./pict/student 4.jpg";
import student5 from "./pict/student 5.jpg";

const Testimonials = () => {
  const testimonialsData = [
    {
      id: 1,
      name: "Sofi",
      position:"Student",
      message:
        "Keren banget Kak Ganis ngejelasinnya lancar dan aku jadi gampang paham sama pelajaran yang diajar. Pokoknya best lah !",
      image:
        student1,
    },
    {
      id: 2,
      name: "Nadia",
      position: "Student",
      message:
        "Belum ada 1 bulan belajar di platform ini, tapi aku udah bisa ngomong pake bahasa Inggris. Menyimak pelajaran dari Kak Ganis seseru itu ternyata.",
      image: student2
     },
      {
      id: 3,
      name: "Sulis",
      position: "Student",
      message:
        "Kenapa aku gk dari dulu aja belajar di sini. Belajar di sini bikin candu dan video-videonya menarik banget.",
      image: student3},
    {
      id: 4,
      name: "Ira",
      position: "Student",
      message:
        "Ini serius platform gratis? waah materinya daging semua. Makasi Kak Ganis",
      image: student4},
    {
      id: 5,
      name: "Rani",
      position: "Student",
      message:
        "Aku butuh materi baru lagi kak. Saking enjoynya semua materi udah aku tonton semua. Kak Ganis jago banget ngejelasinnya bikin betah belajar",
      image: student5 },
  ];
  return (
    <section className="testimonials">
      <h2>What our students say</h2>
      <div className="testmonials-cards">
        {testimonialsData.map((e) => (
          <div className="testimonial-card" key={e.id}>
            <div className="student-image">
              <img src={e.image} alt="" />
            </div>
              <p className="name">{e.name}</p>
              <h4 className="position">{e.position}</h4>
            <p className="message">{e.message}</p>
            <div className="info">
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
