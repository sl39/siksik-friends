package com.ssf.member.domain.date;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Date {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String minDate;
    private String maxDate;

    public void changeMinDate(String minDate) {
        this.minDate = minDate;
    }

    public void changeMaxDate(String maxDate) {
        this.maxDate = maxDate;
    }
}
