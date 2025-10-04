import React, { useState } from 'react';

const EmployeeExpenseView = () => {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      employee: 'Sarah',
      description: 'Restaurant bill',
      date: '4th Oct, 2025',
      category: 'Food',
      paidBy: 'Sarah',
      remarks: 'None',
      amount: '5000 rs',
      status: 'Draft'
    }
  ]);

  // Inline styles
  const styles = {
    container: {
      padding: '20px',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      paddingBottom: '10px',
      borderBottom: '1px solid #dee2e6'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333',
      margin: 0
    },
    buttonGroup: {
      display: 'flex',
      gap: '10px'
    },
    button: {
      padding: '8px 16px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500'
    },
    primaryButton: {
      backgroundColor: '#007bff',
      color: 'white'
    },
    secondaryButton: {
      backgroundColor: '#28a745',
      color: 'white'
    },
    statsSection: {
      display: 'flex',
      gap: '20px',
      marginBottom: '30px'
    },
    statCard: {
      flex: 1,
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      textAlign: 'center'
    },
    statAmount: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333',
      margin: '0 0 8px 0'
    },
    statLabel: {
      fontSize: '14px',
      color: '#666',
      margin: 0
    },
    table: {
      width: '100%',
      backgroundColor: 'white',
      borderCollapse: 'collapse',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    th: {
      backgroundColor: '#f8f9fa',
      padding: '12px 16px',
      textAlign: 'left',
      borderBottom: '1px solid #dee2e6',
      fontWeight: '600',
      color: '#495057',
      fontSize: '14px'
    },
    td: {
      padding: '12px 16px',
      borderBottom: '1px solid #dee2e6',
      fontSize: '14px',
      color: '#333'
    },
    statusBadge: {
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '500',
      display: 'inline-block'
    },
    draftBadge: {
      backgroundColor: '#fff3cd',
      color: '#856404'
    },
    submittedBadge: {
      backgroundColor: '#d1ecf1',
      color: '#0c5460'
    },
    approvedBadge: {
      backgroundColor: '#d4edda',
      color: '#155724'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header with buttons */}
      <div style={styles.header}>
        <h1 style={styles.title}>Expense Management</h1>
        <div style={styles.buttonGroup}>
          <button style={{...styles.button, ...styles.secondaryButton}}>
            Upload
          </button>
          <button style={{...styles.button, ...styles.primaryButton}}>
            New
          </button>
        </div>
      </div>

      {/* Statistics Section */}
      <div style={styles.statsSection}>
        <div style={styles.statCard}>
          <div style={styles.statAmount}>5467 rs</div>
          <div style={styles.statLabel}>To submit</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statAmount}>33674 rs</div>
          <div style={styles.statLabel}>Waiting approval</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statAmount}>500 rs</div>
          <div style={styles.statLabel}>Approved</div>
        </div>
      </div>

      {/* Expenses Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Employee</th>
            <th style={styles.th}>Description</th>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Category</th>
            <th style={styles.th}>Paid By</th>
            <th style={styles.th}>Remarks</th>
            <th style={styles.th}>Amount</th>
            <th style={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td style={styles.td}>{expense.employee}</td>
              <td style={styles.td}>{expense.description}</td>
              <td style={styles.td}>{expense.date}</td>
              <td style={styles.td}>{expense.category}</td>
              <td style={styles.td}>{expense.paidBy}</td>
              <td style={styles.td}>{expense.remarks}</td>
              <td style={styles.td}>{expense.amount}</td>
              <td style={styles.td}>
                <span style={{
                  ...styles.statusBadge,
                  ...(expense.status === 'Draft' ? styles.draftBadge : 
                       expense.status === 'Submitted' ? styles.submittedBadge : 
                       styles.approvedBadge)
                }}>
                  {expense.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {expenses.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          No expenses found. Click "New" to create your first expense.
        </div>
      )}
    </div>
  );
};

export default EmployeeExpenseView;