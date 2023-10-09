package com.ssf.socket.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@Document(collection = "history")
public class History {

    @Id
    int historyId;
    String category;
    String solvedDate;
    String articlesDate;
    List<List<String>> articles;

}
