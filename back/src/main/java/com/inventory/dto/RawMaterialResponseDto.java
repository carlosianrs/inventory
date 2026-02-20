package com.inventory.dto;

public class RawMaterialResponseDto {
	
	private Long id;
	private String name;
	private Long code;
	private Double quantity;
	
	public RawMaterialResponseDto () {}
	
	public Long getId() {
		return id;
	}
	
	public Long getCode() {
		return code;
	}
	
	public String getName() {
		return name;
	}
	
	public Double getQuantity() {
		return quantity;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public void setCode(Long code) {
		this.code = code;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public void setQuantity(Double quantity) {
		this.quantity = quantity;
	}
}
