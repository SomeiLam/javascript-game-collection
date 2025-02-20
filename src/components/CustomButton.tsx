import React from 'react'
import './CustomButton.css'

interface CustomButtonProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onClick: () => void
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  ...inputProps
}) => {
  return (
    <div className="webflow-style-input">
      <input {...inputProps} className="custom-input" />
      <button onClick={onClick} className="custom-button">
        <i className="icon ion-android-arrow-forward"></i>
      </button>
    </div>
  )
}

export default CustomButton
