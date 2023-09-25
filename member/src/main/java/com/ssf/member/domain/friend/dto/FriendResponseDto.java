package com.ssf.member.domain.friend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ssf.member.domain.user.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class FriendResponseDto {

    private Long size;
    private List<UserDto.Response> friendList;
}
