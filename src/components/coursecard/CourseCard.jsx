/* eslint-disable */
import "./courseCard.css";
import { server } from "../../main";
import { UserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { CourseData } from "../../context/CourseContext";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { user, isAuth } = UserData();

  const { fetchCourses } = CourseData();

   // Function to handle enrolling in a course
   const handleEnroll = async (courseId) => {
    try {
      await enrollCourse(courseId);
      toast.success("Successfully enrolled in the course!");
    } catch (error) {
      toast.error(error.response.data.message || "Failed to enroll in the course.");
    }
  };

  // Function to handle unenrolling from a course
  const handleUnenroll = async (courseId) => {
    try {
      await unenrollCourse(courseId);
      toast.success("Successfully unenrolled from the course!");
    } catch (error) {
      toast.error(error.response.data.message || "Failed to unenroll from the course.");
    }
  };

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this course")) {
      try {
        const { data } = await axios.delete(`${server}/api/course/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        toast.success(data.message);
        fetchCourses();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };
  return (
    <div className="course-card">
      <img src={`${server}/${course.image}`} alt="" className="course-image" />
      <h3>{course.title}</h3>
      <p>Instructor- {course.createdBy}</p>
      <p>Duration- {course.duration} Hours</p>
      {isAuth ? (
        <>
          {user && user.role !== "admin" ? (
            <>
              {user.enrolledCourses.includes(course._id) ? (
                <button
                onClick={() => handleEnroll(course._id)}
                className="common-btn enroll-btn"
              >
                Enrolled
              </button>



              ) : (
                <button
                  onClick={() => navigate(`/course/${course._id}`)}
                  className="common-btn"
                >
                  Get Started
                </button>
              )}
            </>
          ) : (
            <button
              onClick={() => navigate(`/course/study/${course._id}`)}
              className="common-btn"
              style={{ background: "#86AB89" }}
            >
              Edit
            </button>
          )}
        </>
      ) : (
        <button onClick={() => navigate("/login")} className="common-btn">
          Get Started
        </button>
      )}

      <br />

      {user && user.role === "admin" && (
        <button
          onClick={() => deleteHandler(course._id)}
          className="common-btn"
          style={{ background: "#C51605" }}
        >
          Delete
        </button>
      )}

      
    </div>
  );
};

export default CourseCard;
