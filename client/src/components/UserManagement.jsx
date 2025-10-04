import React, { useState } from 'react';
import AdminUserApprovalView from './AdminUserApprovalView';

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'marc',
      role: 'Manager',
      manager: 'sarah',
      email: 'marc@gmail.com',
      passwordSent: false
    }
  ]);

  const [showApprovalView, setShowApprovalView] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSaveApprovalRules = (approvalRules) => {
    console.log('Saving approval rules for:', selectedUser.name, approvalRules);
    alert('Approval rules saved successfully!');
    setShowApprovalView(false);
    setSelectedUser(null);
  };

  const handleCancelApprovalRules = () => {
    setShowApprovalView(false);
    setSelectedUser(null);
  };

  const handleSendPassword = (userId) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, passwordSent: true } : user
    ));
    alert('Password sent to user!');
  };

  // Show AdminUserApprovalView when needed
  if (showApprovalView && selectedUser) {
    return (
      <AdminUserApprovalView 
        user={selectedUser}
        onSave={handleSaveApprovalRules}
        onCancel={handleCancelApprovalRules}
      />
    );
  }

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
    button: {
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px'
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
    sendButton: {
      padding: '6px 12px',
      fontSize: '12px',
      backgroundColor: '#17a2b8',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    },
    sentText: {
      color: '#28a745',
      fontSize: '12px',
      fontWeight: '500'
    },
    roleBadge: {
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '500',
      display: 'inline-block'
    },
    managerBadge: {
      backgroundColor: '#e7f3ff',
      color: '#0066cc'
    },
    employeeBadge: {
      backgroundColor: '#f0f0f0',
      color: '#666'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>User Management</h1>
        <button 
          style={styles.button}
          onClick={() => {
            // Create a new user object and directly open AdminUserApprovalView
            const newUser = {
              id: users.length + 1,
              name: '',
              role: 'Employee',
              manager: '',
              email: ''
            };
            setSelectedUser(newUser);
            setShowApprovalView(true);
          }}
        >
          + Add New User
        </button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>User</th>
            <th style={styles.th}>Role</th>
            <th style={styles.th}>Manager</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td style={styles.td}>{user.name}</td>
              <td style={styles.td}>
                <span style={{
                  ...styles.roleBadge,
                  ...(user.role === 'Manager' ? styles.managerBadge : styles.employeeBadge)
                }}>
                  {user.role}
                </span>
              </td>
              <td style={styles.td}>{user.manager}</td>
              <td style={styles.td}>{user.email}</td>
              <td style={styles.td}>
                {user.passwordSent ? (
                  <span style={styles.sentText}>Password Sent</span>
                ) : (
                  <button 
                    style={styles.sendButton}
                    onClick={() => handleSendPassword(user.id)}
                  >
                    Send password
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {users.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          No users found. Click "Add New User" to get started.
        </div>
      )}
    </div>
  );
};

export default UserManagement;