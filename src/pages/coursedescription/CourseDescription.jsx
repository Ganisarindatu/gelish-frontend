/* eslint-disable */
import React, { useEffect, useState } from "react";
import "./coursedescription.css";
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { UserData } from "../../context/UserContext";
import Loading from "../../components/loading/Loading";

const CourseDescription = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);

  const { fetchCourse, course: courseData, fetchCourses, fetchMyCourses } = CourseData();
  const { user, fetchUser } = UserData();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCourse(params.id); // Fetch course details
        await fetchUser(); // Fetch user data
        setCourse(courseData);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch course or user data.");
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id, fetchCourse, fetchUser]);

  const enrollHandler = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${server}/api/enroll`,
        { courseId: params.id }, // Send courseId to backend
        {
          headers: {
            token,
          },
        }
      );

      await fetchUser(); // Fetch user data to update enrolled courses
      await fetchMyCourses(); // Fetch enrolled courses to update dashboard
      toast.success(data.message);
      setLoading(false);
      navigate(`/course/study/${params.id}`);
    } catch (error) {
      toast.error(error.response.data.message || "Failed to enroll in the course.");
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        course && (
          <div className="course-description">
            <div className="course-header">
              <img
                src={`${server}/${course.image}`}
                alt="Course"
                className="course-image"
              />
              <div className="course-info">
                <h2>{course.title}</h2>
                <p>Instructor: {course.createdBy}</p>
                <p >Duration: {course.duration} Hours</p>
                <p>{course.description}</p>
            <p>Enroll in this course for free!</p>
              </div>
            </div>
            

            {/* Check if user has already enrolled in the course */}
            {user && user.enrolledCourses.includes(course._id) ? (
              <button
                onClick={() => navigate(`/course/study/${course._id}`)}
                className="common-btn"
              >
                Study
              </button>
            ) : (
              <button onClick={enrollHandler} className="common-btn">
                Enroll Now
              </button>
            )}
          </div>
        )
      )}
    </>
  );
};

export default CourseDescription;
