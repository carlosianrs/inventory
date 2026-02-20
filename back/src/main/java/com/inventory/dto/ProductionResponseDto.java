package com.inventory.dto;

public class ProductionResponseDto {
		
	private Long id;
	private Long productCode;
	private String productName;
	private Double quantity;
	private Double price_unit;
	private Double total_value;
	
	public ProductionResponseDto () {}
		
	public Long getId() {
		return id;
	}
	
	public Long getProductCode() {
		return productCode;
	}
	
	public void setProductCode(Long productCode) {
		this.productCode = productCode;
	}
	
	public String getProductName() {
		return productName;
	}
	
	public void setProductName(String productName) {
		this.productName = productName;
	}
		
	public Double getQuantity() {
		return quantity;
	}
	
	public void setQuantity(Double quantity) {
		this.quantity = quantity;
	}
	
	public Double getPriceUnit() {
		return price_unit;
	}
	
	public void setPriceUnit(Double price_unit) {
		this.price_unit = price_unit;
	}
	
	public Double getTotalValue() {
		return total_value;
	}
	
	public void setTotalValue(Double total_value) {
		this.total_value = total_value;
	}
}
