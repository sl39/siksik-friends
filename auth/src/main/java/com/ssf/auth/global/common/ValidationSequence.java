package com.ssf.auth.global.common;

import jakarta.validation.GroupSequence;

@GroupSequence({
        ValidationGroups.NotNullGroup.class,
        ValidationGroups.SizeCheckGroup.class,
        ValidationGroups.PatternCheckGroup.class
})
public interface ValidationSequence {
}
