package com.ssf.auth.domain.member.ControllerTest;

import com.google.gson.Gson;
import com.ssf.auth.domain.member.controller.MemberController;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.assertj.core.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class MemberControllerTest {

    @InjectMocks
    private MemberController target;

    private MockMvc mockMvc;
    private Gson gson;

    @Test
    public void mockMvc가Null이아님() throws Exception {
        mockMvc = MockMvcBuilders.standaloneSetup(target)
                        .build();
        assertThat(target).isNotNull();
        assertThat(mockMvc).isNotNull();
    }
}
