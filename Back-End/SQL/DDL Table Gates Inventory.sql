use dbInventories

CREATE TABLE mtUsers(
	user_id VARCHAR(30) NOT NULL,
	username VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	password_salt VARCHAR(255) NOT NULL,
	phone VARCHAR(20) NULL,
	created_at DATETIME NOT NULL,
	last_login DATETIME NOT NULL,
	is_active BIT NOT NULL,

	CONSTRAINT PK_mtUser PRIMARY KEY (user_id)
)



CREATE TABLE pInventory(
	inventory_id VARCHAR(30) NOT NULL,
	inventory_name VARCHAR(30) NOT NULL,
	description VARCHAR(255) NULL,
	created_at DATETIME NOT NULL,
	is_active BIT NOT NULL,
	owner_id VARCHAR(30) NOT NULL,

	CONSTRAINT PK_pInventory PRIMARY KEY (inventory_id),
	CONSTRAINT FK_pInventory_mtUser FOREIGN KEY (owner_id) REFERENCES mtUsers (user_id)
	ON DELETE CASCADE
)

CREATE TABLE pInventoryAccess(
	inventoryAcces_id VARCHAR(30) NOT NULL,
	user_id VARCHAR(30) NOT NULL,
	inventory_id VARCHAR(30) NOT NULL,
	granted_at DATETIME NOT NULL,
	expired_at DATETIME NULL,
	is_active BIT NOT NULL,

	CONSTRAINT PK_pInventoryAccess PRIMARY KEY (inventoryAcces_id),
	CONSTRAINT FK_pInventoryAccess_mtUser FOREIGN KEY (user_id) REFERENCES mtUsers (user_id)
	ON DELETE CASCADE,
	CONSTRAINT FK_pInventoryAccess_pInventory FOREIGN KEY (inventory_id) REFERENCES pInventory (inventory_id)
	ON DELETE NO ACTION 
)

-- # Category
CREATE TABLE pCategory(
	category_id VARCHAR(30) NOT NULL,
	inventory_id VARCHAR(30) NOT NULL,
	name VARCHAR(20) NOT NULL,
	description VARCHAR(255) NULL,

	CONSTRAINT PK_mtCategories PRIMARY KEY (category_id),
	CONSTRAINT FK_pCategory_pInventory FOREIGN KEY (inventory_id) REFERENCES pInventory (inventory_id)
	ON DELETE CASCADE
)

-- # Supliers
CREATE TABLE pSuppliers(
	supplier_id VARCHAR(30) NOT NULL,
	inventory_id VARCHAR(30) NOT NULL,

	supplier_name VARCHAR(30) NOT NULL,
	contact_person VARCHAR(20) NULL,
	email VARCHAR(50) NULL,
	phone VARCHAR(20) NULL,
	address VARCHAR(255) NULL,
	is_active BIT NOT NULL,

	CONSTRAINT PK_mtSuppliers PRIMARY KEY (supplier_id),
	CONSTRAINT FK_mtSuppliers_pInventory FOREIGN KEY (inventory_id) REFERENCES pInventory (inventory_id)
	ON DELETE CASCADE
)

-- # Products
CREATE TABLE pProducts(
	product_id VARCHAR(30) NOT NULL,
	category_id VARCHAR(30) NOT NULL,
	inventory_id VARCHAR(30) NOT NULL,
	supplier_id VARCHAR(30) NOT NULL,

	product_name VARCHAR(30) NOT NULL,
	description VARCHAR(255) NULL,
	SKU VARCHAR(225) NULL,
	unit_price DECIMAL(10,2) NOT NULL,
	current_stock INT NOT NULL,
	minimum_stock INT NOT NULL,
	unit_measure VARCHAR(30) NULL,
	created_at DATETIME NOT NULL,
	updated_at DATETIME NULL,
	is_active BIT NOT NULL,

	CONSTRAINT PK_pProducts PRIMARY KEY (product_id),
	CONSTRAINT FK_pProducts_mtCategory FOREIGN KEY (category_id) REFERENCES pCategory (category_id),
	CONSTRAINT FK_pProducts_pInventory FOREIGN KEY (inventory_id) REFERENCES pInventory (inventory_id),
	CONSTRAINT FK_pProducts_pSupplier FOREIGN KEY (supplier_id) REFERENCES pSuppliers (supplier_id) ON DELETE CASCADE,
)

CREATE TABLE pStockMovements (
	movement_id VARCHAR(30) NOT NULL,
	product_id VARCHAR(30) NOT NULL,
	
	movement_type VARCHAR(30) NOT NULL,
	quantity INT NOT NULL,
	reference_no VARCHAR(30) NULL,
	movement_date DATETIME NOT NULL,
	notes VARCHAR(255) NULL,
	status VARCHAR(30) NULL

	CONSTRAINT PK_pStockMovements PRIMARY KEY (movement_id),
	CONSTRAINT FK_pStockMovements_pProducts FOREIGN KEY (product_id) REFERENCES pProducts (product_id)
	ON DELETE CASCADE
)

CREATE TABLE pAuditLogs (
	log_id VARCHAR(30) NOT NULL,
	user_id VARCHAR(30) NOT NULL,
	record_id VARCHAR(30) NOT NULL,

	action_type VARCHAR(20) NOT NULL,
	table_name VARCHAR(30) NOT NULL,
	old_values VARCHAR(30) NOT NULL,
	new_values VARCHAR(30) NOT NULL,

	action_timestamp DATETIME NOT NULL,
	ip_address VARCHAR(30) NOT NULL,

	CONSTRAINT PK_pAuditLogs PRIMARY KEY (log_id),
	CONSTRAINT FK_pAuditLogs_mtUsers FOREIGN KEY (user_id) REFERENCES mtUsers (user_id)
	ON DELETE CASCADE,
	CONSTRAINT FK_pAuditLogs_pStockMovements FOREIGN KEY (record_id) REFERENCES pStockMovements (movement_id)
	ON DELETE NO ACTION
)