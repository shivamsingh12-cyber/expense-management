import React, { useState } from 'react';

const AdminUserApprovalView = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    user: user?.name || 'marc',
    description: 'Description about rules',
    manager: user?.manager || 'Sarah',
    approversEnabled: true,
    approvers: [
      { name: 'John', required: false },
      { name: 'Michael', required: false },
      { name: 'Andreas', required: true }
    ],
    sequenceRequired: false,
    minApprovalPercentage: 60
  });

  const [newApprover, setNewApprover] = useState('');

  const handleAddApprover = () => {
    if (newApprover.trim() && !formData.approvers.some(a => a.name === newApprover.trim())) {
      setFormData(prev => ({
        ...prev,
        approvers: [...prev.approvers, { name: newApprover.trim(), required: false }]
      }));
      setNewApprover('');
    }
  };

  const handleRemoveApprover = (index) => {
    setFormData(prev => ({
      ...prev,
      approvers: prev.approvers.filter((_, i) => i !== index)
    }));
  };

  const handleToggleRequired = (index) => {
    setFormData(prev => ({
      ...prev,
      approvers: prev.appovers.map((approver, i) => 
        i === index ? { ...approver, required: !approver.required } : approver
      )
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

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
    twoColumnLayout: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '30px',
      marginBottom: '20px'
    },
    column: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#333',
      margin: '0 0 20px 0',
      paddingBottom: '10px',
      borderBottom: '1px solid #dee2e6'
    },
    inputGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: '#495057',
      marginBottom: '8px'
    },
    input: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #ced4da',
      borderRadius: '4px',
      fontSize: '14px'
    },
    select: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #ced4da',
      borderRadius: '4px',
      fontSize: '14px',
      backgroundColor: 'white'
    },
    textarea: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #ced4da',
      borderRadius: '4px',
      fontSize: '14px',
      minHeight: '80px',
      resize: 'vertical'
    },
    checkboxGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '20px'
    },
    checkbox: {
      width: '16px',
      height: '16px'
    },
    checkboxLabel: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#333',
      margin: 0
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: '20px'
    },
    th: {
      backgroundColor: '#f8f9fa',
      padding: '12px',
      textAlign: 'left',
      border: '1px solid #dee2e6',
      fontWeight: '600',
      color: '#495057',
      fontSize: '14px'
    },
    td: {
      padding: '12px',
      border: '1px solid #dee2e6',
      fontSize: '14px'
    },
    removeButton: {
      backgroundColor: '#dc3545',
      color: 'white',
      border: 'none',
      padding: '4px 8px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '12px'
    },
    addApproverContainer: {
      display: 'flex',
      gap: '10px',
      marginTop: '10px'
    },
    addButton: {
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '12px'
    },
    percentageInput: {
      width: '100px',
      padding: '8px 12px',
      border: '1px solid #ced4da',
      borderRadius: '4px',
      fontSize: '14px'
    },
    buttonGroup: {
      display: 'flex',
      gap: '10px',
      justifyContent: 'flex-end',
      marginTop: '20px'
    },
    saveButton: {
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px'
    },
    cancelButton: {
      backgroundColor: '#6c757d',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px'
    },
    infoText: {
      fontSize: '12px',
      color: '#666',
      fontStyle: 'italic',
      margin: '5px 0'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Approval Rules Configuration</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={styles.twoColumnLayout}>
          {/* Left Column */}
          <div style={styles.column}>
            <h3 style={styles.sectionTitle}>User Details</h3>
            
            {/* User */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>User</label>
              <input
                type="text"
                value={formData.user}
                onChange={(e) => setFormData(prev => ({ ...prev, user: e.target.value }))}
                style={styles.input}
                placeholder="Enter user name"
              />
            </div>

            {/* Description */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Description about rules</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                style={styles.textarea}
                placeholder="Enter description about rules"
              />
            </div>

            {/* Manager */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Manager</label>
              <select
                value={formData.manager}
                onChange={(e) => setFormData(prev => ({ ...prev, manager: e.target.value }))}
                style={styles.select}
              >
                <option value="Sarah">Sarah</option>
                <option value="John">John</option>
                <option value="Michael">Michael</option>
                <option value="Andreas">Andreas</option>
              </select>
              <p style={styles.infoText}>
                Initially the manager set on user record should be set, admin can change manager for approval if required.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div style={styles.column}>
            <h3 style={styles.sectionTitle}>Approval Rules</h3>
            
            {/* Approvers Checkbox */}
            <div style={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="approvers"
                checked={formData.approversEnabled}
                onChange={(e) => setFormData(prev => ({ ...prev, approversEnabled: e.target.checked }))}
                style={styles.checkbox}
              />
              <label htmlFor="approvers" style={styles.checkboxLabel}>
                Approvers
              </label>
            </div>
            <p style={styles.infoText}>
              As manager an approved. If this field is divided then by default the approved request would go to his/her manager first, before going to other approvers.
            </p>

            {/* Approvers Table */}
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>User</th>
                  <th style={styles.th}>Required</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {formData.approvers.map((approver, index) => (
                  <tr key={index}>
                    <td style={styles.td}>{approver.name}</td>
                    <td style={styles.td}>
                      <input
                        type="checkbox"
                        checked={approver.required}
                        onChange={() => handleToggleRequired(index)}
                        style={styles.checkbox}
                      />
                    </td>
                    <td style={styles.td}>
                      <button 
                        type="button"
                        style={styles.removeButton}
                        onClick={() => handleRemoveApprover(index)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Add New Approver */}
            <div style={styles.addApproverContainer}>
              <input
                type="text"
                value={newApprover}
                onChange={(e) => setNewApprover(e.target.value)}
                placeholder="Enter approver name"
                style={styles.input}
              />
              <button 
                type="button"
                style={styles.addButton}
                onClick={handleAddApprover}
              >
                Add Approver
              </button>
            </div>

            {/* Approvers Sequence Checkbox */}
            <div style={{...styles.checkboxGroup, marginTop: '20px'}}>
              <input
                type="checkbox"
                id="sequence"
                checked={formData.sequenceRequired}
                onChange={(e) => setFormData(prev => ({ ...prev, sequenceRequired: e.target.checked }))}
                style={styles.checkbox}
              />
              <label htmlFor="sequence" style={styles.checkboxLabel}>
                Approvers Sequence
              </label>
            </div>
            <p style={styles.infoText}>
              If this field is ticked true then the above mentioned sequence of approvers matters, that is first the request goes to John, if he approves/rejects then only request goes to which and so on. If the required approver rejects the request, then expense request is outcorrigected. If not ticked then send approver request to all approvers at the same time.
            </p>

            {/* Minimum Approval Percentage */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Minimum Approval Percentage</label>
              <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.minApprovalPercentage}
                  onChange={(e) => setFormData(prev => ({ ...prev, minApprovalPercentage: parseInt(e.target.value) || 0 }))}
                  style={styles.percentageInput}
                />
                <span>%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={styles.buttonGroup}>
          <button 
            type="button" 
            style={styles.cancelButton}
            onClick={onCancel}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            style={styles.saveButton}
          >
            Save Approval Rules
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminUserApprovalView;