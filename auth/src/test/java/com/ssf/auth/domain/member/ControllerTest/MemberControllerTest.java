package com.ssf.auth.domain.member.ControllerTest;

import com.google.gson.Gson;
import com.ssf.auth.domain.member.controller.MemberController;
import com.ssf.auth.domain.member.enums.SocialType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.assertj.core.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class MemberControllerTest {

    @InjectMocks
    private MemberController target;

    private MockMvc mockMvc;
    private Gson gson;

    @BeforeEach
    public void init() {
        gson = new Gson();
        mockMvc = MockMvcBuilders.standaloneSetup(target)
                .build();
    }

    @Test
    public void mockMvc가Null이아님() throws Exception {
        assertThat(target).isNotNull();
        assertThat(mockMvc).isNotNull();
    }

    @Test
    public void 멤버등록실패_사용자식별값이헤더에없음() throws Exception {

        // given
        final String url = "/api/v1/member";

        // when
        final ResultActions resultActions = mockMvc.perform(
                MockMvcRequestBuilders.post(url)
                        .content(gson.toJson(memberRequest("test@test.com", SocialType.NONE)))
                        .contentType(MediaType.APPLICATION_JSON)
        )
    }

    private MemberRequest memberRequest(final String email, final SocialType socialType) {
        return MemberRequest.builder()
                .email(email)
                .socialType(socialType)
                .build();
    }
}
