/* eslint-disable */
import React, { useEffect } from "react";
import { CourseData } from "../../context/CourseContext";
import { UserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { server } from "../../main"; // Ensure this path is correct

const Dashboard = () => {
  const { mycourse, fetchMyCourse, unenrollCourse } = CourseData();
  const { isAuth } = UserData();
  const navigate = useNavigate();

  // Fetch enrolled courses when the component mounts
  useEffect(() => {
    if (isAuth) {
      fetchMyCourse();
    }
  }, [isAuth, fetchMyCourse]);

  // Handle study button click
  const handleStudy = (courseId) => {
    navigate(`/course/study/${courseId}`); // Redirect to the lecture page
  };

  // Handle unenroll button click
  const handleUnenroll = async (courseId) => {
    try {
      await unenrollCourse(courseId); // Call unenroll function from context
      toast.success("Successfully unenrolled from the course!");
      fetchMyCourse(); // Refresh the list of enrolled courses
    } catch (error) {
      toast.error(error.response.data.message || "Failed to unenroll from the course.");
    }
  };

  return (
    <div className="dashboard">
      <h2>My Courses</h2>
      <div className="course-container">
        {mycourse && mycourse.length > 0 ? (
          mycourse.map((course) => (
            <div key={course._id} className="course-card">
              <img
                src={`${server}/${course.image}`}
                alt={course.title}
                className="course-image"
              />
              <h3>{course.title}</h3>
              <p>Instructor - {course.createdBy}</p>
              <p>Duration - {course.duration} Hours</p>
              
              {/* Study button directs to the course lecture page */}
              <button
                onClick={() => handleStudy(course._id)}
                className="common-btn"
              >
                Study
              </button>
              <br />
              {/* Unenroll button to cancel enrollment */}
              <button
                onClick={() => handleUnenroll(course._id)}
                className="common-btn unenroll-btn"
              >
                Unenroll
              </button>
            </div>
          ))
        ) : (
          <p>No enrolled courses</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
