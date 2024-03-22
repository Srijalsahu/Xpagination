import React, { useState, useEffect } from 'react';
import styles from './pagination.module.css';

const Pagination = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      alert(error.message);
    }
  };

  const nextPage = () => {
    const totalPages = Math.ceil(employees.length / 10);
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const lastIndex = currentPage * 10;
  const firstIndex = lastIndex - 10;
  const currentEmployees = employees.slice(firstIndex, lastIndex);

  return (
    <div className={styles.pagination}>
      <h2>Employee Data</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.buttons}>
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage}</span>
        <button onClick={nextPage} disabled={currentPage === Math.ceil(employees.length / 10)}>Next</button>
      </div>
    </div>
  );
};

export default Pagination;