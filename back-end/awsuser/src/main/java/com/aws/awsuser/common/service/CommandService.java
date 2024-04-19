package com.aws.awsuser.common.service;


import com.aws.awsuser.common.component.MessengerVO;

public interface CommandService<T> {
    MessengerVO save(T t);
    MessengerVO deleteById(Long id);
    MessengerVO modify(T t);
}
