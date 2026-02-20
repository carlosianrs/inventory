package com.inventory.dto;

public class ProductRawMaterialResponseDto {
	
	private Long id;
	private Long productId;
	private Long productCode;
	private String productName;
	private Long rawMaterialId;
	private Long rawMaterialCode;
	private String rawMaterialName;
	private Double quantity;
	
	public ProductRawMaterialResponseDto () {
		
	}
	
	public Long getId() {
		return id;
	}
	
	public Long getProductId() {
		return productId;
	}
	
	public Long getProductCode() {
		return productCode;
	}
	
	public String getProductName() {
		return productName;
	}
	
	public Long getRawMaterialId() {
		return rawMaterialId;
	}
	
	public Long getRawMaterialCode() {
		return rawMaterialCode;
	}
	
	public String getRawMaterialName() {
		return rawMaterialName;
	}
	
	public Double getQuantity() {
		return quantity;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public void setProductId(Long productId) {
		this.productId = productId;
	}
	
	public void setProductCode(Long productCode) {
		this.productCode = productCode;
	}
	
	public void setProductName(String productName) {
		this.productName = productName;
	}
	
	public void setRawMaterialId(Long rawMaterialId) {
		this.rawMaterialId = rawMaterialId;
	}
	
	public void setRawMaterialCode(Long rawMaterialCode) {
		this.rawMaterialCode = rawMaterialCode;
	}
	
	public void setRawMaterialName(String rawMaterialName) {
		this.rawMaterialName = rawMaterialName;
	}
	
	public void setQuantity(Double quantity) {
		this.quantity = quantity;
	}
}
