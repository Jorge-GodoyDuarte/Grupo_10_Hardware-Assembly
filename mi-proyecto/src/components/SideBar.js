import React from 'react'

export const SideBar = () => {
  return (
    <ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">

			
			<hr className="sidebar-divider my-0"/>

			
			<li className="nav-item active">
				<a className="nav-link" href="/">
					<i className="fas fa-fw fa-tachometer-alt"></i>
					<span>HA - PANEL ADMIN</span></a>
			</li>

		
			<hr className="sidebar-divider"/>

			
			<div className="sidebar-heading">Acciones</div>

			<li className="nav-item">
				<a className="nav-link collapsed" href="/">
					<i className="fas fa-fw fa-folder"></i>
					<span>Paginas</span>
				</a>
			</li>

			<li className="nav-item">
				<a className="nav-link" href="/">
					<i className="fas fa-fw fa-chart-area"></i>
					<span>Charts</span></a>
			</li>

		
			<li className="nav-item">
				<a className="nav-link" href="/">
					<i className="fas fa-fw fa-table"></i>
					<span>Tables</span></a>
			</li>

	
			<hr className="sidebar-divider d-none d-md-block"/>
		</ul>
  )
}
