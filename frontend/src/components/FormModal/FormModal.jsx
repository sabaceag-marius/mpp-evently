import React from "react";
import styles from "./FormModal.module.css";

const FormModal = ({ onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Create Event</h2>
        <form className={styles.formContainer}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" rows="3" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="start-date">Start Date</label>
            <div className={styles.dateTimeRow}>
              <input type="date" id="start-date" name="start-date" />
              <select id="start-time" name="start-time">
                <option value="09:00">09:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="15:00">03:00 PM</option>
                <option value="18:00">06:00 PM</option>
              </select>
            </div>
          </div>

          <button type="submit" className={styles.submitButton}>Submit</button>
        </form>
        <button className={styles.closeButton} onClick={onClose}>X</button>
      </div>
    </div>
  );
};

export default FormModal;
