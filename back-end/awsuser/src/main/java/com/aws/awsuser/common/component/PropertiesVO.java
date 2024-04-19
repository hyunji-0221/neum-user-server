package com.aws.awsuser.common.component;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@NoArgsConstructor
@Data

@Component
public class PropertiesVO {
    private Boolean enabled;
    private String location;
    private String maxFileSize;
    private String maxRequestSize;
    private String fileSizeThreshold;
}
