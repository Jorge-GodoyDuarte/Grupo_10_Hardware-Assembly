import React from 'react'

export const Metric = ({title,color,icon,data}) => {
  return (
    <div className="col-md-4 mb-4">
    <div className={`card border-left-${color} shadow h-100 py-2`}>
        <div className="card-body">
            <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                    <div className={`text-xs font-weight-bold text-primary text-${color} mb-1`}>{title}</div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">{data}</div>
                    
                    
                </div>
                <div className="col-auto">
                    <i className={`fa-solid ${icon}`}></i>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}
