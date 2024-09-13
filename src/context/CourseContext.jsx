/* eslint-disable */
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../main";

const CourseContext = createContext();

export const CourseContextProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState([]);
  const [mycourse, setMyCourse] = useState([]);

  async function fetchCourses() {
    try {
      const { data } = await axios.get(`${server}/api/course/all`);
      setCourses(data.courses);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchCourse(id) {
    try {
      const { data } = await axios.get(`${server}/api/course/${id}`);
      setCourse(data.course);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchMyCourse() {
    try {
      const { data } = await axios.get(`${server}/api/mycourse`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setMyCourse(data.courses);
    } catch (error) {
      console.log(error);
    }
  }

  async function enrollCourse(courseId) {
    try {
      const { data } = await axios.post(
        `${server}/api/enroll`,
        { courseId },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      fetchMyCourse(); // Refresh the list of enrolled courses
      console.log(data.message);
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  async function unenrollCourse(courseId) {
    try {
      const { data } = await axios.post(
        `${server}/api/unenroll`,
        { courseId },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      fetchMyCourse(); // Refresh the list of enrolled courses
      console.log(data.message);
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  useEffect(() => {
    fetchCourses();
    fetchMyCourse();
  }, []);

  return (
    <CourseContext.Provider
      value={{
        courses,
        fetchCourses,
        fetchCourse,
        course,
        mycourse,
        fetchMyCourse,
        enrollCourse,
        unenrollCourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const CourseData = () => useContext(CourseContext);
