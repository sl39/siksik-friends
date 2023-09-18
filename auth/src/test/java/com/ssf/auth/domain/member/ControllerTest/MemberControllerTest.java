package com.ssf.auth.domain.member.ControllerTest;

import com.google.gson.Gson;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class MemberControllerTest {

    private MemberController target;

    private MockMvc mockMvc;
    private Gson gson;

    @Test
    public void mockMvc가Null이아님() throws Exception {
        assertThat(target).isNotnull();
        assertThat(mockMvc).isNotNull();
    }
}
