//package com.aws.awsuser.user.service;
//
//import lombok.extern.slf4j.Slf4j;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.junit.jupiter.MockitoExtension;
//
//import java.time.LocalDate;
//import java.time.format.DateTimeFormatter;
//import java.util.stream.Stream;
//
//import static org.assertj.core.api.Assertions.assertThat;
//
//@Slf4j
//@ExtendWith(MockitoExtension.class)
//public class SubStringDemo {
//    @Test
//    public void 문자열_분할() throws Exception {
//        String str = "a,b,c";
//        String sb = new StringBuilder(str)
//                .append(",d,e,f")
//                .toString();
//
//        String[] arr = sb.split(",");
//        assertThat(arr.length).isEqualTo(3);
//
//    }
//
//    @Test
//    public void 주민번호로_성별_구분() throws Exception {
//        String human1 = "970301-1";
//        String human2 = "950101-2";
//        String human3 = "020101-3";
//        String human4 = "000221-4";
//        //외국인
//        String human5 = "730103-5";
//        String human6 = "820221-6";
//        String human7 = "120103-7";
//        String human8 = "050103-8";
//
//        log.info(human1);
//        assertThat(getGender(human1)).isEqualTo("남성");
//
//        StringBuilder sb = new StringBuilder();
//        String str = sb.append(human1).append(",")
//                .append(human2).append(",")
//                .append(human3).append(",")
//                .append(human4).append(",")
//                .append(human5).append(",")
//                .append(human6).append(",")
//                .append(human7).append(",")
//                .append(human8)
//                .toString();
//        String[] arr = str.split(",");
//
//        for (int i = 0; i < arr.length; i++) {
//            log.info((i + 1) + "번째성별 : " + getGender(arr[i]));
//        }
//
//    }
//
//    private String getGender(String ssn) {
//        // charAt()
//        return switch (ssn.charAt(7)) {
//            case '1', '3' -> "남성";
//            case '2', '4' -> "여성";
//            case '5', '7' -> "남성 외국인";
//            case '6', '8' -> "여성 외국인";
//            default -> "잘못된 입력입니다.";
//        };
//    }
//
//    private String getAge(String ssn) {
//        // substring()
//        LocalDate now = LocalDate.now();
//        int year = now.getYear();
//
//        int birthYear = Integer.parseInt(ssn.substring(0, 2));
//
//        switch (ssn.charAt(7)) {
//            case '1', '2', '5', '7' -> birthYear += 1900;
//            case '3', '4', '6', '8' -> birthYear += 2000;
//            default -> birthYear = 0;
//        }
//
//        int age = year - birthYear;
//
//        return "";
//    }
//
//    @Test
//    public void now() {
//        LocalDate now = LocalDate.now();
//        int year = now.getYear();
//        assertThat(year).isEqualTo(2024);
//        int month = now.getMonthValue();
//        assertThat(month).isEqualTo(4);
//        int day = now.getDayOfMonth();
//        assertThat(day).isEqualTo(24);
//    }
//
//    @Test
//    public void birthYear() {
//        String ssn = "970301-1";
//        int birthYear = Integer.parseInt(ssn.substring(0, 2));
//        if (ssn.charAt(7) == '1') {
//            birthYear += 1900;
//        }
//        log.info(String.valueOf(birthYear));
//        assertThat(birthYear).isEqualTo(1997);
//
//
//        String ssn2 = "020101-4";
//        int birthYear2 = Integer.parseInt(ssn2.substring(0, 2));
//        if (ssn2.charAt(7) == '4') {
//            birthYear2 += 2000;
//        }
//        log.info(String.valueOf(birthYear2));
//        assertThat(birthYear2).isEqualTo(2002);
//    }
//
//    @Test
//    public void getAge() {
//        LocalDate now = LocalDate.now();
//        int year = now.getYear();
//        int month = now.getMonthValue();
//        int day = now.getDayOfMonth();
//
//        String ssn = "000221-4";
//        int birthYear = Integer.parseInt(ssn.substring(0, 2));
//        birthYear += switch (ssn.charAt(7)) {
//            case '1', '2', '5', '7' -> 1900;
//            case '3', '4', '6', '8' -> 2000;
//            default -> 0;
//        };
//        int age = year - birthYear;
//
//        int birthMonth = Integer.parseInt(ssn.substring(2, 4));
//        int birthDay = Integer.parseInt(ssn.substring(4, 6));
//        if (birthMonth > month) {
//            age--;
//        } else {
//            if (birthDay > day) {
//                age--;
//            }
//        }
//
//        assertThat(age).isEqualTo(24);
//    }
//
//    @Test
//    public void getAgeUsingLambda() {
//        String originSsn = "000221-4";
//        int fullYear = Integer.parseInt(LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd")));
//        int age = Stream.of(originSsn)
//                .map(ssn -> Integer.parseInt(ssn.substring(0, 2)))
//                .map(birthYear ->
//                        switch (originSsn.charAt(7)) {
//                            case '1', '2', '5', '7' -> birthYear + 1900;
//                            case '3', '4', '6', '8' -> birthYear + 2000;
//                            default -> birthYear + 0;
//                        })
//                .map(i-> i*10000) //20000000
//                .map(i-> i+Integer.parseInt(originSsn.substring(2,6))) //20000221
//                .map(i -> (fullYear-i)/10000) //24
//                .findFirst()
//                .get();
//
//        assertThat(age).isEqualTo(24);
//    }
//}
