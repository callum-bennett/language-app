import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import * as Colors from "../constants/Colors";
import CategoryWordsScreen from "./CategoryWordsScreen";
import CategoryOverview from "../components/CategoryOverview";
import { CategoryContext } from "../navigation/RootNavigation";
import { startLesson } from "../store/actions/lessons";
import { useDispatch, useSelector } from "react-redux";
import { selectCategoryById } from "../store/selectors/category";

const initialLayout = { width: Dimensions.get("window").width };

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: "white" }}
    style={{ backgroundColor: Colors.accent }}
  />
);

const CategoryScreen = (props) => {
  const dispatch = useDispatch();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "overview", title: "Overview" },
    { key: "vocabulary", title: "My Vocabulary" },
  ]);

  const { categoryId } = props.route.params;

  const [category] = useSelector((state) => [
    selectCategoryById(state, categoryId),
  ]);

  const handlePressLearn = async (lesson) => {
    dispatch(startLesson(lesson.id));
    props.navigation.navigate({
      name: "CategoryLesson",
      params: {
        lessonId: lesson.id,
        title: `${category.name} / Lesson ${lesson.sequence + 1}`,
      },
    });
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "overview":
        return <CategoryOverview onPressLearn={handlePressLearn} />;
      case "vocabulary":
        return <CategoryWordsScreen />;
      default:
        return null;
    }
  };

  return (
    <CategoryContext.Provider value={props.route.params}>
      <TabView
        lazy
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        style={styles.container}
        initialLayout={initialLayout}
      />
    </CategoryContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default CategoryScreen;
