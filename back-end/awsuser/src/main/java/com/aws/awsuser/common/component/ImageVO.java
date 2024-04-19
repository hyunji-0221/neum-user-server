package com.aws.awsuser.common.component;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@NoArgsConstructor
@AllArgsConstructor
@Component
@Data
@Builder
public class ImageVO {
    private long imageId;
    String name;
    Long lastModified; //숫자로 받고 데이터로 빠져나감
    Long lastModifiedDate;
    String type;
    String webkitRelativePath;
    Long size; //private 걸지 않아도 됨(노출되어도 괜찮음) = getter, setter 사용하지 않고 쓰기 위함
}
