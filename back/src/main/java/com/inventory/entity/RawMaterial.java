package com.inventory.entity;

import java.util.List;
import jakarta.persistence.*;

@Entity
@Table(name = "RAW_MATERIALS")
public class RawMaterial {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	@SequenceGenerator(name = "raw_material_seq", sequenceName = "RAW_MATERIAL_SEQ", allocationSize = 1)
	Long id;
	
	@Column(nullable = false)
	private String name;
	
	@Column(nullable = false, unique = true)
	private Long code;
	
	private Double quantity;
	
	@OneToMany(mappedBy = "rawMaterial")
	private List<ProductRawMaterial> products;
	
	public RawMaterial () {
		
	}
	
	public RawMaterial (String name, Long code, Double quantity) {
		this.name = name;
		this.code = code;
		this.quantity = quantity;
	}
	
	public Long getId () {
		return id;
	}
	
	public String getName () {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public Long getCode () {
		return code;
	}
	
	public void setCode(Long code) {
		this.code = code;
	}
	
	public Double getQuantity () {
		return quantity;
	}
	
	public void setQuantity(Double quantity) {
		this.quantity = quantity;
	}
}
